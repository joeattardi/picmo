import { Placement } from '@popperjs/core';
import { Locale, GroupKey, MessagesDataset, Emoji } from 'emojibase';
import { Renderer } from './renderers/renderer';
import { Dictionary } from './i18n';

export type EmojiFocusTarget = {
  row: 'first' | 'last' | number;
  offset: number;
};

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
}

export type EmojiSelection = {
  url?: string;
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

export type Position = FixedPosition | Placement;

export type CategoryKey = GroupKey | 'recents' | 'custom';

export type Category = {
  key: CategoryKey;
  message: string;
  order: number;
}

export type PickerOptions = {
  renderer: Renderer;
  theme: string;
  rootElement: HTMLElement;

  showRecents: boolean;
  showCategoryTabs: boolean;
  showSearch: boolean;
  showVariants: boolean;
  showPreview: boolean;

  hideOnClickOutside: boolean;
  hideOnEmojiSelect: boolean;
  hideOnEscape: boolean;
  autoFocusSearch: boolean;

  position: Position;
  referenceElement?: HTMLElement;
  triggerElement?: HTMLElement;

  maxRecents: number;
  emojisPerRow: number;
  emojiSize: string;
  visibleRows: number;

  custom?: CustomEmoji[];
  emojiVersion: number;

  i18n: Dictionary;
  locale: Locale;

  emojiData: Emoji[];
  messages: MessagesDataset;
};
