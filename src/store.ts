import type { DataState, Category } from './data';

import { writable } from 'svelte/store';

type CategorySelection = {
  category: Category;
  method: 'click' | 'scroll' | 'initial';
};

export const categoryStore = writable<Category[]>(null);
export const dataStore = writable<DataState>({ status: 'IDLE' });
export const selectedCategoryStore = writable<CategorySelection>(null);

export type CategoryStore = typeof categoryStore;
export type DataStore = typeof dataStore;
export type SelectedCategoryStore = typeof selectedCategoryStore;
