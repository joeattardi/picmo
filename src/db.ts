import { GroupMessage, Emoji } from 'emojibase';
import { Category } from './types';

import { caseInsensitiveIncludes } from './util';

const DATABASE_NAME = 'EmojiButton';

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

  async getCategories(): Promise<Category[]> {
    const transaction = this.db.transaction('category', 'readonly');
    const categoryStore = transaction.objectStore('category');
    const result = await this.waitForRequest(categoryStore.getAll());
    const categories = result.target.result;
    return categories.filter(category => category.key !== 'component');
  }

  async getEmojis(category: Category, emojiVersion: number): Promise<Emoji[]> {
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
    });
  }

  private queryMatches(emoji: Emoji, query: string) {
    return (
      caseInsensitiveIncludes(emoji.label, query) ||
      emoji.tags?.some(tag => caseInsensitiveIncludes(tag, query))
    );
  }

  async searchEmojis(query: string, emojiVersion: number): Promise<Emoji[]> {
    const results: Emoji[] = [];

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('emoji', 'readonly');
      const emojiStore = transaction.objectStore('emoji');
      const request = emojiStore.openCursor();

      request.onsuccess = (event: any) => {
        const cursor: IDBCursorWithValue = event.target?.result;
        if (!cursor) {
          return resolve(results);
        }

        const emoji = cursor.value as Emoji;
        if (this.queryMatches(emoji, query) && emoji.version <= emojiVersion) {
          results.push(emoji);
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
