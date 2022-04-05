import { GroupMessage, Emoji } from 'emojibase';
import { EmojiRecord, Category, CategoryKey } from './types';

import { caseInsensitiveIncludes } from './util';

const DATABASE_NAME = 'EmojiButton';

type SearchableEmoji = {
  label: string;
  tags?: string[];
}

/**
 * Transforms an Emoji from emojibase into an EmojiRecord.
 * 
 * @param emoji the Emoji from the database
 * @returns the equivalent EmojiRecord
 */
function getEmojiRecord(emoji: Emoji): EmojiRecord {
  return {
    emoji: emoji.emoji,
    label: emoji.label,
    tags: emoji.tags,
    skins: emoji.skins?.map(skin => getEmojiRecord(skin)),
    order: emoji.order,
    custom: false,
    hexcode: emoji.hexcode
  };
}

export class Database {
  private db: IDBDatabase;

  async open(): Promise<IDBDatabase> {
    const request = indexedDB.open(DATABASE_NAME);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        this.db = event.target?.result;
        resolve(this.db);
      };

      request.onerror = reject;
      request.onupgradeneeded = async (event: any) => {
        this.db = event.target?.result;

        this.db.createObjectStore('category', { keyPath: 'order' });

        const emojiStore = this.db.createObjectStore('emoji', { keyPath: 'emoji' });
        emojiStore.createIndex('category', 'group');
        emojiStore.createIndex('version', 'version');
      };
    });
  }

  async isPopulated(): Promise<boolean> {
      const transaction = this.db.transaction('category', 'readonly');
      const store = transaction.objectStore('category');
      const categoryCountResult = await this.waitForRequest(store.count());
      const categoryCount = categoryCountResult.target.result;
      return categoryCount > 0;
  }

  async populate(groups: GroupMessage[], emojis: Emoji[]) {
    await Promise.all([
      this.addObjects('category', groups),
      this.addObjects('emoji', emojis)
    ]);
  }

  async getCategories(include?: CategoryKey[]): Promise<Category[]> {
    const transaction = this.db.transaction('category', 'readonly');
    const categoryStore = transaction.objectStore('category');
    const result = await this.waitForRequest(categoryStore.getAll());
    let categories = result.target.result.filter(category => category.key !== 'component');

    if (include) {
      categories = categories.filter(category => include.includes(category.key));
      categories.sort((a: Category, b: Category) => include.indexOf(a.key) - include.indexOf(b.key));
    } else {
      categories.sort((a: Category, b: Category) => a.order - b.order);
    }

    return categories;
  }

  async getEmojiForVersion(emojiVersion: number): Promise<Emoji> {
    const transaction = this.db.transaction('emoji', 'readonly');
    const emojiStore = transaction.objectStore('emoji');
    const index = emojiStore.index('version');
    const result = await this.waitForRequest(index.get(emojiVersion));
    return result.target.result as Emoji;
  }

  async getEmojis(category: Category, emojiVersion: number): Promise<EmojiRecord[]> {
    const transaction = this.db.transaction('emoji', 'readonly');
    const emojiStore = transaction.objectStore('emoji');
    const groupsIndex = emojiStore.index('category');
    const result = await this.waitForRequest(groupsIndex.getAll(category.order));
    const emojis = result.target.result as Emoji[];
    return emojis
      .filter((e: Emoji) => e.version <= emojiVersion)
      .sort((a: Emoji, b: Emoji) => {
        if (a.order != null && b.order != null) {
          return a.order - b.order;
        }

       return 0;
    })
    .map(getEmojiRecord);
  }

  private queryMatches(emoji: SearchableEmoji, query: string, categories?: Category[]) {
    if (categories && !categories.some(category => category.order === (emoji as Emoji).group)) {
      return false;
    }

    return (
      caseInsensitiveIncludes(emoji.label, query) ||
      emoji.tags?.some(tag => caseInsensitiveIncludes(tag, query))
    );
  }

  // TODO handle errors
  async searchEmojis(query: string, customEmojis: EmojiRecord[], emojiVersion: number, categories: Category[]): Promise<EmojiRecord[]> {
    const results: EmojiRecord[] = [];

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('emoji', 'readonly');
      const emojiStore = transaction.objectStore('emoji');
      const request = emojiStore.openCursor();

      request.onsuccess = (event: any) => {
        const cursor: IDBCursorWithValue = event.target?.result;
        if (!cursor) {
          return resolve([
            // matching emojis from the database
            ...results,

            // matching custom emojis
            ...customEmojis.filter(emoji => this.queryMatches(emoji, query))
          ]);
        }

        const emoji = cursor.value as Emoji;
        if (this.queryMatches(emoji, query, categories) && emoji.version <= emojiVersion) {
          results.push(getEmojiRecord(emoji));
        }

        cursor.continue();
      };
    });
  }

  async waitForRequest(request: IDBRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }

  protected withTransaction(storeName: string | string[], mode: IDBTransactionMode = 'readwrite', callback: (transaction: IDBTransaction) => void) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, mode);
      transaction.oncomplete = resolve;
      transaction.onerror = reject;

      callback(transaction);
    });
  }

  protected async addObjects(storeName: string, objects: any[]) {
    return this.withTransaction(storeName, 'readwrite', transaction => {
      const store = transaction.objectStore(storeName);

      objects.forEach(object => {
        store.add(object);
      });
    });
  }
}
