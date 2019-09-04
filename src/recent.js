import { renderEmojiContainer } from './emojiContainer';

const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function renderRecents(events) {
  return renderEmojiContainer(load(), events);
}

function load() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

export function save(emoji) {
  const recents = load();

  const recent = {
    ...emoji,
    key: emoji.n[0]
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([recent, ...recents.filter(r => r.key !== recent.key)].slice(0, 50)));
}
