import { EmojiRecord } from '../types';

export abstract class RecentsProvider {
  abstract clear(): void;
  abstract getRecents(maxCount: number): Array<EmojiRecord>;
  abstract addOrUpdateRecent(emoji: EmojiRecord, maxCount: number): void;
}
