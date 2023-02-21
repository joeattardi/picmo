import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { DataStore, Category, EmojiRecord } from './data';

export type SearchState = {
  query: string;
  results?: EmojiRecord[];
  search?: Promise<EmojiRecord[]>;
};

export type SearchService = {
  store: Writable<SearchState>;
  search: (query: string) => void;
};

export function SearchService(db: DataStore, emojiVersion: number, categories: Category[]): SearchService {
  const store = writable<SearchState>();

  function search(query: string) {
    const search = db.searchEmojis(query, emojiVersion, categories);

    store.update(state => ({
      ...state,
      query,
      search
    }));

    search.then(results => {
      store.update(state => ({ ...state, results }));
    });
  }

  return {
    store,
    search
  };
}
