import { Locale, MessagesDataset, Emoji } from 'emojibase';
import { Renderer } from './renderers/renderer';
import { Dictionary } from './i18n/bundle';
import { DataStoreFactory } from './data/DataStore';

export type EmojiFocusTargetOffset = {
  row: 'first' | 'last' | number;
  offset: number;
};

export type EmojiFocusTarget = EmojiFocusTargetOffset | string;

export type EmojiRecord = {
  emoji: string;
  label: string;
  tags?: string[];
  url?: string;
  skins?: EmojiRecord[];
  order?: number;
  custom?: boolean;
  hexcode?: string;
  data?: any;
  version?: number;
}

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
  /**
   * The renderer to use for rendering and emitting emojis.
   * This should be an instance of a subclass of `Renderer`.
   * @default new NativeRenderer()
   */
  renderer: Renderer;

  /**
   * The color theme to use for the picker. Should be one of the class names
   * exported by `picmo/themes`.
   * @default `lightTheme`
   */
  theme: string;

  className?: string;

  dataStore: DataStoreFactory;

  /**
   * The DOM element that the picker will be appended to. Any existing children
   * will be removed.
   */
  rootElement: HTMLElement;

  /**
   * Whether or not to show animated transitions in the picker.
   * @default true
   */
  animate?: boolean;

  /**
   * Whether or not to show recently used emojis.
   * @default `true`
   */
  showRecents: boolean;

  /**
   * Whether or not to show the category tabs.
   * @default true
   */
  showCategoryTabs: boolean;

  /**
   * Whether or not to show the search box.
   * @default true
   */
  showSearch: boolean;

  /**
   * Whether or not to show the variants of emojis, where supported.
   * If `false`, the default variant will always be emitted.
   * @default true
   */
  showVariants: boolean;

  /**
   * Whether or not to show the preview of an emoji on hover or focus.
   * @default true
   */
  showPreview: boolean;

  /**
   * Whether or not to autofocus the search field when the picker is rendered.
   * @default false
   */
  autoFocusSearch: boolean;

  /**
   * The maximum number of recent emojis that should be remembered.
   * @default 50
   */
  maxRecents: number;

  /**
   * The number of emojis that should be displayed per row.
   * @default 8
   */
  emojisPerRow: number;

  /**
   * The size of the emojis in the picker grid.
   * Should be a valid CSS size string, e.g. `'1em'`.
   * @default '2rem'
   */
  emojiSize: string;

  /**
   * The number of rows that should be visible in the picker's scroll area.
   * @default 6
   */
  visibleRows: number;

  /**
   * The categories to show in the picker. Leave undefined to show all categories.
   * The categories will appear in the order that they are set in this array.
   * @default undefined
   */
  categories?: CategoryKey[];

  initialCategory?: CategoryKey;

  initialEmoji?: string;

  /**
   * An array of custom emoji records to show in the picker.
   */
  custom?: CustomEmoji[];

  /**
   * The version of the Emoji standard to use, or 'auto' to
   * automatically detect the supported version.
   * @default 'auto'
   */
  emojiVersion: number | 'auto';

  /**
   * A dictionary of i18n strings for UI messages.
   * @default the built-in English strings
   */
  i18n: Dictionary;

  /**
   * The locale to use for emoji labels. Allows all locales supported
   * by Emojibase.
   */
  locale: Locale;

  /**
   * The static emoji data to use instead of loading it from the CDN.
   */
  emojiData?: Emoji[];

  /**
   * The static category data to use instead of loading it from the CDN.
   */
  messages?: MessagesDataset;
};
