import type { EmojiRecord } from '../data';
import { RecentsProvider } from './RecentsProvider';

const STORAGE_KEY = 'PicMo:recents';

export abstract class WebStorageProvider extends RecentsProvider {
  storage: Storage;
  maxRecents: number;

  constructor(storage: Storage, maxRecents = 50) {
    super();
    this.storage = storage;
    this.maxRecents = maxRecents;
  }

  clear(): void {
    this.storage.removeItem(STORAGE_KEY);
  }

  getRecents(): Array<EmojiRecord> {
    try {
      const recents = JSON.parse(this.storage.getItem(STORAGE_KEY) ?? '[]');
      return recents.slice(0, this.maxRecents);
    } catch (error) {
      // storage is not available, no recents
      return [];
    }
  }

  addOrUpdateRecent(emoji: EmojiRecord) {
    // Add the new recent to the beginning of the list, removing it if it exists already
    const recents = [emoji, ...this.getRecents().filter(recent => recent.hexcode !== emoji.hexcode)].slice(
      0,
      this.maxRecents
    );

    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(recents));
      return recents;
    } catch (error) {
      console.warn('storage is not available, recent emojis will not be saved');
    }
  }
}
