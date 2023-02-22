import type { Subscriber, Unsubscriber, Writable } from 'svelte/store';
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
  clear: () => void;
  subscribe: (run: Subscriber<SearchState>) => Unsubscriber;
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

  function clear() {
    store.set({
      query: '',
      search: null,
      results: null
    });
  }

  return {
    store,
    search,
    clear,
    subscribe: store.subscribe.bind(store)
  };
}
