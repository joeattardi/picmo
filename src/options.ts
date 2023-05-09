import type { ComponentType, SvelteComponentTyped } from 'svelte';
import type { Emoji, Locale, MessagesDataset } from 'emojibase';
import PlatformEmoji from './components/renderers/PlatformEmoji.svelte';
import { type DataStoreFactory, type CategoryKey, type CustomEmoji, IndexedDbStoreFactory } from './data';
import { recentsProvider, type RecentsProvider } from './recents-provider';
import type { Theme } from './types';

export type PickerOptions = {
  categories?: CategoryKey[];
  columns: number;
  custom?: CustomEmoji[];
  dataStore: DataStoreFactory;
  emojiData?: Emoji[];
  emojiVersion: number | 'auto';
  locale: Locale;
  messages?: MessagesDataset;
  recentsProvider: RecentsProvider;
  renderer: ComponentType<SvelteComponentTyped>;
  rows: number;
  showCategoryTabs: boolean;
  showPreview: boolean;
  showRecents: boolean;
  showSearch: boolean;
  showVariants: boolean;
  theme: Theme;
  emojiSize: string;
};

const defaults: PickerOptions = {
  locale: 'en',
  emojiVersion: 'auto',
  emojiSize: '32px',
  showCategoryTabs: true,
  showPreview: true,
  showRecents: true,
  showSearch: true,
  showVariants: true,
  theme: 'light',
  rows: 8,
  columns: 8,
  renderer: PlatformEmoji,
  // TODO: do these need to be moved to prevent side effects?
  recentsProvider: recentsProvider(35),
  dataStore: IndexedDbStoreFactory
};

export function getOptions(userOptions: Partial<PickerOptions>): PickerOptions {
  const options = {
    ...defaults,
    ...userOptions
  };

  return options;
}
