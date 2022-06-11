import { PickerOptions } from './types';

import { NativeRenderer } from './renderers/native';
import { lightTheme } from './themes';
import en from './i18n/lang-en';
import { IndexedDbStoreFactory } from './data/IndexedDbStore';
import { LocalStorageProvider } from './recents/LocalStorageProvider';

const defaultOptions: Partial<PickerOptions> = {
  renderer: new NativeRenderer(),
  dataStore: IndexedDbStoreFactory,
  theme: lightTheme,

  animate: true,

  showCategoryTabs: true,
  showPreview: true,
  showRecents: true,
  showSearch: true,
  showVariants: true,

  emojisPerRow: 8,
  visibleRows: 6,

  emojiVersion: 'auto',
  i18n: en,
  locale: 'en',

  maxRecents: 50,
  recentsProvider: new LocalStorageProvider(),

  custom: []
};

export function getOptions(options: Partial<PickerOptions> = {}): PickerOptions {
  return { 
    ...defaultOptions,
    ...options 
  } as PickerOptions;
}
