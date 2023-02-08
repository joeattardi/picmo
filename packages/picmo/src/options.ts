import { PickerOptions } from './types';
import { lightTheme } from './themes';
import { NativeRenderer } from './renderers/native';
import en from './i18n/lang-en';
import { IndexedDbStoreFactory } from './data/IndexedDbStore';
import { LocalStorageProvider } from './recents/LocalStorageProvider';
import { isLocalStorageAvailable } from './util';
import { createStorage } from './webStorageShim';

const defaultOptions: Partial<PickerOptions> = {
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

  custom: []
};

if (!isLocalStorageAvailable()) {
  console.warn('[picmo] localStorage not available, falling back to simple in-memory storage');
  Object.defineProperty(window, 'localStorage', {
    value: createStorage()
  });
}

export function getOptions(options: Partial<PickerOptions> = {}): PickerOptions {
  return { 
    ...defaultOptions,
    ...options,
    renderer: options.renderer || new NativeRenderer(),
    recentsProvider: options.recentsProvider || new LocalStorageProvider()
  } as PickerOptions;
}
