import type { EmojiRecord } from './data';

const STORAGE_KEY = 'PicMo:recents';

type RecentEmojis = Array<EmojiRecord>;

export type RecentsProvider = {
  getRecents: () => RecentEmojis;
  clearRecents: () => void;
  addOrUpdateRecent: (emoji: EmojiRecord) => RecentEmojis;
};

export function recentsProvider(maxRecents: number): RecentsProvider {
  // Holds the recents. This lets us still have recents even if local
  // storage isn't available. When we can, it is synced to local storage.
  let recents: RecentEmojis;

  function getRecents(): RecentEmojis {
    if (!recents) {
      try {
        recents = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (error) {
        recents = [];
      }
    }

    return recents.slice(0, maxRecents);
  }

  function clearRecents(): void {
    recents = [];

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // do nothing if local storage is not available
    }
  }

  function addOrUpdateRecent(emoji: EmojiRecord): RecentEmojis {
    // If the recent already exists, remove it first
    recents = [emoji, ...recents.filter(recent => recent.id !== emoji.id)];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recents));
    } catch (error) {
      // failed to write, but recents will still stay in memory
    }

    return recents;
  }

  return {
    getRecents,
    clearRecents,
    addOrUpdateRecent
  };
}
