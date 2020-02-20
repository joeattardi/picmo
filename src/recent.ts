import { getEmojiName } from './util';
import { EmojiData, EmojiButtonOptions, RecentEmoji } from './types';

const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function load() {
  const recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return recentJson ? JSON.parse(recentJson) : [];
}

export function save(emoji: any, options: EmojiButtonOptions): void {
  const recents = load();

  const recent = {
    e: emoji.e,
    n: getEmojiName(emoji),
    k: emoji.k || getEmojiName(emoji)
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      [recent, ...recents.filter((r: RecentEmoji) => r.k !== recent.k)].slice(
        0,
        options.recentsCount
      )
    )
  );
}
