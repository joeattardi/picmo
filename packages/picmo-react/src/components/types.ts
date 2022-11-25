import { Emoji, MessagesDataset } from 'emojibase';
import themes from '../themes.module.css';
import { CategoryKey, CustomEmoji } from '../data/types';
import { DataStoreFactory } from '../data/DataStore';
import { Locale } from 'emojibase';

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
