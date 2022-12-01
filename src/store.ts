import type { Writable } from 'svelte/store';
import type { DataState, Category } from './data';

import { writable } from 'svelte/store';

// export type CategoryStore = Writable<Category[]>;

export const categoryStore = writable<Category[]>(null);
export const dataStore = writable<DataState>({ status: 'IDLE' });

export type CategoryStore = typeof categoryStore;
export type DataStore = typeof dataStore;
