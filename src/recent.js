import { getEmojiName } from './util';

const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function load() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

export function save(emoji, options) {
  const recents = load();

  const recent = {
    e: emoji.e,
    n: getEmojiName(emoji),
    k: emoji.k || getEmojiName(emoji)
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      [recent, ...recents.filter(r => r.k !== recent.k)].slice(
        0,
        options.recentsCount
      )
    )
  );
}
