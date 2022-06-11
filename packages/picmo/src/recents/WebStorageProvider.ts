import { EmojiRecord } from '../types';
import { RecentsProvider } from './RecentsProvider';

const STORAGE_KEY = 'PicMo:recents';

export abstract class WebStorageProvider extends RecentsProvider {
     storage: Storage;

  constructor(storage: Storage) {
    super();
    this.storage = storage;
  }

  clear(): void {
    this.storage.removeItem(STORAGE_KEY);
  }

  getRecents(maxCount: number): Array<EmojiRecord> {
    try {
      const recents = JSON.parse(this.storage.getItem(STORAGE_KEY) ?? '[]');
      return recents.slice(0, maxCount);
    } catch (error) { // storage is not available, no recents
      return [];
    }
  }

  addOrUpdateRecent(emoji: EmojiRecord, maxCount: number) {
    // Add the new recent to the beginning of the list, removing it if it exists already
    const recents = [
      emoji,
      ...this.getRecents(maxCount).filter(recent => recent.hexcode !== emoji.hexcode)
    ].slice(0, maxCount);
    
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(recents));
    } catch (error) {
      console.warn('storage is not available, recent emojis will not be saved');
    }
  }
}
