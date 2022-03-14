import { Placement } from '@popperjs/core';
import { Locale, GroupKey, MessagesDataset, Emoji } from 'emojibase';
import { Renderer } from './renderers/renderer';
import { Dictionary } from './i18n';

export type CustomEmoji = {
  name: string;
  url: string;
};

export type FixedPosition = {
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
  triggerElement?: HTMLElement;

  maxRecents?: number;
  emojisPerRow?: number;
  emojiSize?: string;
  visibleRows?: number;

  custom?: CustomEmoji[];
  emojiVersion?: number;

  i18n?: Dictionary;
  locale?: Locale;

  emojiData?: Emoji[];
  messages?: MessagesDataset;
};
