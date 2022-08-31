import { EmojiExtra, EmojiRecord } from './types';

export function applyExtraData(emoji: EmojiRecord, extraData?: EmojiExtra) {
  const extended = extraData?.[emoji.emoji] || {};
  return {
    ...emoji,
    ...extended,
    tags: [
      ...emoji.tags || [],
      ...extended.tags || []
    ]
  };
}
