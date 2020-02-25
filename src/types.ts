import { Placement } from '@popperjs/core';

export interface EmojiRecord {
  name: string;
  emoji: string;
  category: number;
  version: string;
  variations?: string[];
}

export interface EmojiData {
  categories: string[];
  emojiData: EmojiRecord[];
}

export interface EmojiVariation {
  key: string;
  name: string;
  emoji: string;
}

export interface RecentEmoji {
  key: string;
  name: string;
  emoji: string;
}

export interface EmojiEventData {
  emoji: EmojiRecord | EmojiVariation;
  showVariants: boolean;
  button: HTMLElement;
}

export interface EmojiButtonOptions {
  position?: Placement;
  autoHide?: boolean;
  autoFocusSearch?: boolean;
  showPreview?: boolean;
  showSearch?: boolean;
  showRecents?: boolean;
  showVariants?: boolean;
  recentsCount?: number;
  rootElement?: HTMLElement;
  emojiVersion?: EmojiVersion;
  i18n?: I18NStrings;
  zIndex?: number;
  theme?: EmojiTheme;
}

export type EmojiTheme = 'dark' | 'light' | 'auto';

export type EmojiVersion = '0.0' | '2.0' | '4.0' | '5.0' | '11.0' | '12.1';

export type I18NCategory =
  | 'recents'
  | 'smileys'
  | 'people'
  | 'animals'
  | 'food'
  | 'activities'
  | 'travel'
  | 'objects'
  | 'symbols'
  | 'flags';

export interface I18NStrings {
  search: string;
  categories: {
    [key in I18NCategory]: string;
  };
  notFound: string;
}
