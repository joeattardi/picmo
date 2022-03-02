const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function clear(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function load(): Array<any> {
  const recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const recents = recentJson ? JSON.parse(recentJson) : [];
  return recents.filter(recent => !!recent.emoji);
}

// TODO make this an object that can be created in the main class
export function save(emoji: any, recentsCount: number, events: any): void {
  const recents = load();

  const recent = {
    emoji: emoji.emoji,
    name: emoji.name,
    key: emoji.key || emoji.name,
    custom: emoji.custom
  };

  events.emit('recent:add', recent);

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify([recent, ...recents.filter(r => !!r.emoji && r.key !== recent.key)].slice(0, recentsCount))
  );
}
