import { EmojiRecord, ExcludeEmojis } from './types';

/** returns a function that checks if emojis should be excluded */
export const createExcluder = (
  exclude?: ExcludeEmojis
): ((e: EmojiRecord) => boolean) => {
  if (exclude === undefined) return () => false;

  return typeof exclude === 'function'
    ? (e: EmojiRecord) => exclude(e.emoji)
    : (e: EmojiRecord) => exclude.includes(e.emoji);
};
