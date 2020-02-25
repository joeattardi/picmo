import { getEmojiName } from './util';
import { EmojiRecord, EmojiButtonOptions, RecentEmoji } from './types';

const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function load(): Array<RecentEmoji> {
  const recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return recentJson ? JSON.parse(recentJson) : [];
}

export function save(
  emoji: EmojiRecord | RecentEmoji,
  options: EmojiButtonOptions
): void {
  const recents = load();

  const recent = {
    emoji: emoji.emoji,
    name: getEmojiName(emoji),
    key: (emoji as RecentEmoji).key || getEmojiName(emoji)
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      [recent, ...recents.filter((r: RecentEmoji) => r.key !== recent.key)].slice(
        0,
        options.recentsCount
      )
    )
  );
}
