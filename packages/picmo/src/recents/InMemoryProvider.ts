import { EmojiRecord } from '../types';
import { RecentsProvider } from './RecentsProvider';

export class InMemoryProvider extends RecentsProvider {
  recents = [] as Array<EmojiRecord>;

  clear(): void {
    this.recents = [];
  }

  getRecents(maxCount: number): Array<EmojiRecord> {
    return this.recents.slice(0, maxCount);
  }

  addOrUpdateRecent(emoji: EmojiRecord, maxCount: number): void {
    this.recents = [
      emoji,
      ...this.getRecents(maxCount).filter(recent => recent.hexcode !== emoji.hexcode)
    ].slice(0, maxCount);
  }
}
