import type { Emoji, MessagesDataset, Locale } from 'emojibase';
import type { DataStoreFactory, CategoryKey, CustomEmoji } from './data';

export type PickerOptions = {
  rootElement: HTMLElement;
  dataStore: DataStoreFactory;
  // theme: Theme;
  categories?: CategoryKey[];
  custom?: CustomEmoji[];
  emojiData?: Emoji[];
  locale: Locale;
  messages?: MessagesDataset;
  showCategoryTabs: boolean;
  showPreview: boolean;
  showRecents: boolean;
  showSearch: boolean;
  showVariants: boolean;
};
