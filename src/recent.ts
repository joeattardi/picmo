import { EmojiRecord, EmojiButtonOptions, RecentEmoji } from './types';

const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function load(): Array<RecentEmoji> {
  const recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const recents = recentJson ? JSON.parse(recentJson) : [];
  return recents.filter(recent => !!recent.emoji);
}

export function save(
  emoji: EmojiRecord | RecentEmoji,
  options: EmojiButtonOptions
): void {
  const recents = load();

  const recent = {
    emoji: emoji.emoji,
    name: emoji.name,
    key: (emoji as RecentEmoji).key || emoji.name,
    custom: emoji.custom
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      [
        recent,
        ...recents.filter((r: RecentEmoji) => !!r.emoji && r.key !== recent.key)
      ].slice(0, options.recentsCount)
    )
  );
}
