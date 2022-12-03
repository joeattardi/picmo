import type { DataState, Category } from './data';

import { writable } from 'svelte/store';

export const categoryStore = writable<Category[]>(null);
export const dataStore = writable<DataState>({ status: 'IDLE' });

export type CategoryStore = typeof categoryStore;
export type DataStore = typeof dataStore;