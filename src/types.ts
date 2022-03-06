import { Placement } from '@popperjs/core';
import { Locale, GroupKey } from 'emojibase';
import { Renderer } from './renderers/renderer';
import { Dictionary } from './i18n';

export type CustomEmoji = {
  name: string;
  url: string;
};

type FixedPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type Position = FixedPosition | Placement;

export type CategoryKey = GroupKey | 'recents' | 'custom';

export type Category = {
  key: CategoryKey;
  message: string;
  order: number;
}

// export type EmojiCategory =
//   | 'recents'
//   | 'smileys'
//   | 'people'
//   | 'animals'
//   | 'food'
//   | 'activities'
//   | 'travel'
//   | 'objects'
//   | 'symbols'
//   | 'flags'
//   | 'custom';

export type Theme = {
  theme: { [key: string]: string };
};

export type PickerOptions = {
  renderer?: Renderer;
  theme?: string;
  rootElement?: HTMLElement;

  showRecents?: boolean;
  showCategoryButtons?: boolean;
  showSearch?: boolean;
  showVariants?: boolean;
  showPreview?: boolean;

  autoHide?: boolean;
  autoFocusSearch?: boolean;

  position?: Position;
  referenceElement?: HTMLElement;

  maxRecents?: number;
  emojisPerRow?: number;
  emojiSize?: string;
  visibleRows?: number;

  custom?: CustomEmoji[];
  emojiVersion?: string;

  i18n?: Dictionary;
  locale?: Locale;
};
