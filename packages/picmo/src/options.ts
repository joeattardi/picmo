import { PickerOptions } from './types';

import { NativeRenderer } from './renderers/native';
import { lightTheme } from './themes';
import en from './i18n/lang-en';
import { IndexedDbStoreFactory } from './data/IndexedDbStore';

const defaultOptions: Partial<PickerOptions> = {
  renderer: new NativeRenderer(),
  dataStore: IndexedDbStoreFactory,
  theme: lightTheme,

  animate: true,

  showSearch: true,
  showCategoryTabs: true,
  showVariants: true,
  showRecents: true,
  showPreview: true,

  emojisPerRow: 8,
  visibleRows: 6,

  emojiVersion: 'auto',
  maxRecents: 50,
  i18n: en,
  locale: 'en',

  custom: []
};

export function getOptions(options: Partial<PickerOptions> = {}): PickerOptions {
  return { 
    ...defaultOptions,
    ...options 
  } as PickerOptions;
}
