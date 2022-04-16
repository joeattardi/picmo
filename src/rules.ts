import { EmojiRecord } from './types';
export type EmojiProcessingRule = (emoji: EmojiRecord, version: number) => EmojiRecord | null;

export const rules: EmojiProcessingRule[] = [

  // Prior to Emoji 14, the handshake emoji's skin tone variants was not standardized
  // and will not render correctly as a native emoji. 
  (emoji: EmojiRecord, emojiVersion: number) => {
    if (emoji.hexcode === '1F91D' && emojiVersion < 14) {
      emoji.skins = [];
    }

    return emoji;
  }
];

export function applyRulesToEmoji(emoji: EmojiRecord, emojiVersion: number) {
  if (rules.some(rule => rule(emoji, emojiVersion) === null)) {
    return null;
  }

  return emoji;
}

export function applyRules(emojis: EmojiRecord[], emojiVersion: number): EmojiRecord[] {
  return emojis.filter(emoji => applyRulesToEmoji(emoji, emojiVersion) !== null);
}
