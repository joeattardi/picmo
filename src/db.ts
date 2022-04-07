import { GroupMessage, Emoji, Locale } from 'emojibase';
import { EmojiRecord, Category, CategoryKey } from './types';

import { caseInsensitiveIncludes } from './util';

// Base database name. It will have the locale appended to it.
const DATABASE_NAME = 'PicMo';

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
  locale: Locale;

  constructor(locale: Locale) {
    this.locale = locale;
  }

  /**
   * Creates/opens the database.
   * 
   * There are three data stores:
   * 
   * - category: stores the categories
   * - emoji: stores the emoji data itself
   * - meta: stores metadata such as the ETags
   * 
   * @returns a Promise that resolves when the database is ready
   */
  async open(): Promise<void> {
    const request = indexedDB.open(`${DATABASE_NAME}-${this.locale}`);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        this.db = event.target?.result;
        resolve();
      };

      request.onerror = reject;
      request.onupgradeneeded = async (event: any) => {
        this.db = event.target?.result;

        this.db.createObjectStore('category', { keyPath: 'order' });

        const emojiStore = this.db.createObjectStore('emoji', { keyPath: 'emoji' });
        emojiStore.createIndex('category', 'group');
        emojiStore.createIndex('version', 'version');

        this.db.createObjectStore('meta');
      };
    });
  }

  /**
   * Gets the ETags stored in the meta datastore.
   * @returns a Promise that resolves to the ETag data
   */
  async getEtags(): Promise<Record<string, string | undefined>> {
    const transaction = this.db.transaction('meta', 'readonly');
    const store = transaction.objectStore('meta');
    const [emojisEtag, messagesEtag] = await Promise.all([
      this.waitForRequest(store.get('emojisEtag')),
      this.waitForRequest(store.get('messagesEtag'))
    ]);

    return {
      storedEmojisEtag: emojisEtag.target.result,
      storedMessagesEtag: messagesEtag.target.result
    };
  }

  /**
   * Stores ETag values for the emoji and message data.
   * @param emojisEtag the ETag for the emoji data
   * @param messagesEtag the ETag for the message data
   */
  async setEtags(emojisEtag, messagesEtag) {
    const transaction = this.db.transaction('meta', 'readwrite');
    const store = transaction.objectStore('meta');
    await Promise.all([
      this.waitForRequest(store.put(emojisEtag, 'emojisEtag')),
      this.waitForRequest(store.put(messagesEtag, 'messagesEtag'))
    ]);
  }

  async isPopulated(): Promise<boolean> {
      const transaction = this.db.transaction('category', 'readonly');
      const store = transaction.objectStore('category');
      const categoryCountResult = await this.waitForRequest(store.count());
      const categoryCount = categoryCountResult.target.result;
      return categoryCount > 0;
  }

  /**
   * Removes any current data and re-populates the data stores with the given data.
   * @param groups the group message data
   * @param emojis the emoji data
   * @param emojisEtag the emoji data ETag
   * @param messagesEtag the message data ETag
   * 
   * @returns a Promise that resolves when all data has been written
   */
  async populate(groups: GroupMessage[], emojis: Emoji[], emojisEtag?: string | null, messagesEtag?: string | null) {
    // Wipe out any old data first
    await this.removeAllObjects('category', 'emoji');

    const tasks = [
      this.addObjects('category', groups),
      this.addObjects('emoji', emojis),
      this.setEtags(emojisEtag, messagesEtag)
    ];

    await Promise.all(tasks);
  }

  /**
   * Gets the emoji categories.
   * 
   * If an include list is specified, only those categories will be returned - and will be in the same sort order.
   * Otherwise, all categories (except 'component') are returned.
   * 
   * @param include an array of CategoryKeys to include
   * @returns an arrya of all categories, or only the ones specified if include is given
   */
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

  /**
   * Finds the first emoji for a particular emoji version.
   * 
   * @param emojiVersion the emoji version to check
   * @returns a Promise that resolves to the first emoji for that version
   */
  async getEmojiForVersion(emojiVersion: number): Promise<Emoji> {
    const transaction = this.db.transaction('emoji', 'readonly');
    const emojiStore = transaction.objectStore('emoji');
    const index = emojiStore.index('version');
    const result = await this.waitForRequest(index.get(emojiVersion));
    return result.target.result as Emoji;
  }

  /**
   * Gets all emojis for a particular category and emoji version.
   * 
   * @param category the category to get emojis for
   * @param emojiVersion the maximum version for returned emojis
   * @returns a Promise that resolves to an array of the EmojiRecord data
   */
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

  protected async removeAllObjects(...storeNames: string[]) {
    const transaction = this.db.transaction(storeNames, 'readwrite');
    const stores = storeNames.map(storeName => transaction.objectStore(storeName));
    await Promise.all(stores.map(store => this.waitForRequest(store.clear())));
  }

  protected async addObjects(storeName: string, objects: any[]) {
    return this.withTransaction(storeName, 'readwrite', transaction => {
      const store = transaction.objectStore(storeName);
      objects.forEach(object => { store.add(object); });
    });
  }
}
