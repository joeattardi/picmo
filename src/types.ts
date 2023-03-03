import type { Writable } from 'svelte/store';
import type { Category, DataState, EmojiRecord } from './data';

export type CategorySelection = {
  category: Category;
  method: 'click' | 'scroll' | 'initial';
};

type NavigationTarget = 'search' | 'categories' | 'emojis' | 'searchResults';
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
  column?: number;
  applyFocus?: boolean;
};

export type NavigationStore = Writable<Navigation>;
export type SelectedCategoryStore = Writable<CategorySelection>;
export type RecentsStore = Writable<EmojiRecord[]>;
export type DataStore = Writable<DataState>;
export type PreviewStore = Writable<EmojiRecord>;
export type VariantStore = Writable<VariantState>;
export type FocusStore = Writable<FocusState>;

export type Theme = 'light' | 'dark' | 'auto';
