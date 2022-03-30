import { LATEST_EMOJI_VERSION } from 'emojibase';
import { PickerOptions } from './types';

import NativeRenderer from './renderers/native';
import { lightTheme } from './themes';
import en from './i18n/lang-en';

const defaultOptions: Partial<PickerOptions> = {
  rootElement: document.body,
  renderer: new NativeRenderer(),
  theme: lightTheme,

  showSearch: true,
  showCategoryTabs: true,
  showVariants: true,
  showRecents: true,
  showPreview: true,

  hideOnClickOutside: true,
  hideOnEmojiSelect: true,
  hideOnEscape: true,
  autoFocusSearch: true,

  position: 'auto',
  emojisPerRow: 8,
  visibleRows: 6,

  emojiVersion: parseFloat(LATEST_EMOJI_VERSION),
  maxRecents: 50,
  i18n: en,
  locale: 'en',

  custom: []
};

export function getOptions(options: Partial<PickerOptions>): PickerOptions {
  return { ...defaultOptions, ...options } as PickerOptions;
}
