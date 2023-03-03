import { writable, type Writable } from 'svelte/store';
import { LATEST_EMOJI_VERSION } from 'emojibase';

import type { PickerOptions } from './options';
import type { DataStore, GetCategoriesOptions, EmojiMappings, Category, EmojiRecord } from './data';
import { initDatabase } from './data';
import { determineEmojiVersion } from './emojiSupport';

export type DataStatus = 'IDLE' | 'LOADING' | 'READY' | 'ERROR';

export type PendingDataState = {
  status: 'IDLE' | 'LOADING';
};

export type DataState = {
  status: 'READY';
  dataStore: DataStore | null;
  error: null;
};

export type ErrorDataState = {
  status: 'ERROR';
  error: unknown | null;
};

type DataServiceOptions = Pick<
  PickerOptions,
  'locale' | 'dataStore' | 'custom' | 'messages' | 'emojiData' | 'emojiVersion'
> &
  GetCategoriesOptions;

function getEmojiVersion(specifiedVersion: number | 'auto') {
  const emojiVersion = specifiedVersion === 'auto' ? determineEmojiVersion() : specifiedVersion;
  return emojiVersion || parseFloat(LATEST_EMOJI_VERSION);
}

export type DataServiceReturnValue = {
  emojiVersion: number;
  customEmojis: EmojiRecord[];
  categoryEmojis: EmojiMappings;
  initialize: () => Promise<DataStore>;
  store: Writable<DataState | PendingDataState | ErrorDataState>;
  readonly categories: Category[];
};

function createCategoryMappings(categories: Category[], allEmojis: EmojiRecord[][]) {
  return categories.reduce<EmojiMappings>(
    (result, category, index) => ({
      ...result,
      [category.key]: allEmojis[index]
    }),
    {} as EmojiMappings
  );
}

export function DataService(options: DataServiceOptions): DataServiceReturnValue {
  const store = writable<DataState | PendingDataState | ErrorDataState>({ status: 'IDLE' });
  const emojiVersion = getEmojiVersion(options.emojiVersion);
  let categories: Category[];
  let customEmojis: EmojiRecord[];
  let categoryEmojis: EmojiMappings;

  async function initialize() {
    try {
      store.update(state => ({ ...state, status: 'LOADING' }));

      const db = await initDatabase(
        options.locale,
        options.dataStore,
        options.custom,
        options.messages,
        options.emojiData
      );
      categories = await db.getCategories(options);
      customEmojis = db.customEmojis;

      const allEmojis = await Promise.all(categories.map(category => db.getEmojis(category, emojiVersion)));
      categoryEmojis = createCategoryMappings(categories, allEmojis);

      store.set({
        dataStore: db,
        status: 'READY',
        error: null
      });

      return db;
    } catch (error) {
      store.update(state => ({ ...state, status: 'ERROR', error }));
    }
  }

  return {
    initialize,
    emojiVersion,
    store,
    get customEmojis() {
      return customEmojis;
    },
    get categoryEmojis() {
      return categoryEmojis;
    },
    get categories() {
      return categories;
    }
  };
}
