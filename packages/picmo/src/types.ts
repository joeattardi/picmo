import { Locale, MessagesDataset, Emoji } from 'emojibase';
import { Renderer } from './renderers/renderer';
import { Dictionary } from './i18n/bundle';
import { DataStoreFactory } from './data/DataStore';
import { RecentsProvider } from './recents/RecentsProvider';

export type EmojiFocusTargetOffset = {
  row: 'first' | 'last' | number;
  offset: number;
};

export type EmojiFocusTarget = EmojiFocusTargetOffset | string;

export type EmojiRecord = {
  custom?: boolean;
  data?: any;
  emoji: string;
  hexcode?: string;
  label: string;
  order?: number;
  skins?: EmojiRecord[];
  tags?: string[];
  url?: string;
  version?: number;
}

export type EmojiExtra = Record<string, Partial<EmojiRecord>>;

export type EmojiSelection = {
  url?: string;
  hexcode?: string;
  emoji: string;
  label: string;
  data?: any;
}

export type CustomEmoji = {
  emoji: string;
  label: string;
  url: string;
  tags?: string[];
  data?: any;
};

export type FixedPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type CategoryKey = 'activities' | 'animals-nature' | 'custom' | 'flags' | 'food-drink' | 'objects' | 'people-body' | 'recents' | 'smileys-emotion' | 'symbols' | 'travel-places';

export type Category = {
  key: CategoryKey;
  message?: string;
  order: number;
}

export type PickerOptions = {
  animate?: boolean;
  autoFocus?: 'auto' | 'search' | 'emojis' | 'none';
  autoFocusSearch: boolean;
  categories?: CategoryKey[];
  className?: string;
  custom?: CustomEmoji[];
  dataStore: DataStoreFactory;
  emojiData?: Emoji[];
  emojiSize: string;
  emojisPerRow: number;
  emojiVersion: number | 'auto';
  extraData?: EmojiExtra;
  i18n: Dictionary;
  initialCategory?: CategoryKey;
  initialEmoji?: string;
  locale: Locale;
  maxRecents: number;
  messages?: MessagesDataset;
  recentsProvider: RecentsProvider;
  renderer: Renderer;
  rootElement: HTMLElement;
  showCategoryTabs: boolean;
  showPreview: boolean;
  showRecents: boolean;
  showSearch: boolean;
  showVariants: boolean;
  theme: string;
  visibleRows: number;
};

export type UpdatableOptions = Pick<Partial<PickerOptions>, 
  'className' |
  'theme' |
  'emojiSize' |
  'emojisPerRow' |
  'visibleRows'
>;
