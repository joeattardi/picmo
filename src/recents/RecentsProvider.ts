import type { EmojiRecord } from '../data';

export abstract class RecentsProvider {
  abstract clear(): void;
  abstract getRecents(): Array<EmojiRecord> | Promise<Array<EmojiRecord>>;
  abstract addOrUpdateRecent(emoji: EmojiRecord): EmojiRecord[];
}
