import type { Writable } from 'svelte/store';
import type { Emoji, MessagesDataset, Locale } from 'emojibase';
import type { DataStoreFactory, CategoryKey, CustomEmoji, Category, DataState, EmojiRecord } from './data';
import type { RecentsProvider } from './recents/RecentsProvider';

export type CategorySelection = {
  category: Category;
  method: 'click' | 'scroll' | 'initial';
};

type NavigationTarget = 'search' | 'categories' | 'emojis';
export type Navigation = {
  target: NavigationTarget;
};

export type VariantState = {
  emoji: EmojiRecord;
  element: HTMLElement;
};

export type FocusState = {
  category: number;
  offset: number;
  applyFocus?: boolean;
};

export type NavigationStore = Writable<Navigation>;
export type SelectedCategoryStore = Writable<CategorySelection>;
export type CategoryStore = Writable<Category[]>;
export type RecentsStore = Writable<EmojiRecord[]>;
export type DataStore = Writable<DataState>;
export type PreviewStore = Writable<EmojiRecord>;
export type VariantStore = Writable<VariantState>;
export type FocusStore = Writable<FocusState>;

export type Theme = 'light' | 'dark' | 'auto';

export type PickerOptions = {
  rows: number;
  columns: number;
  dataStore: DataStoreFactory;
  theme: Theme;
  categories?: CategoryKey[];
  custom?: CustomEmoji[];
  emojiData?: Emoji[];
  emojiVersion: number | 'auto';
  locale: Locale;
  messages?: MessagesDataset;
  recentsProvider: RecentsProvider;
  showCategoryTabs: boolean;
  showPreview: boolean;
  showRecents: boolean;
  showSearch: boolean;
  showVariants: boolean;
};
