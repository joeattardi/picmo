import { Emoji, MessagesDataset, Locale } from 'emojibase';
import themes from './themes.module.css';
import { DataStoreFactory, CategoryKey, CustomEmoji } from './data';

export type Theme = keyof typeof themes;

export type PickerOptions = {
  dataStore: DataStoreFactory;
  theme: Theme;
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
}
