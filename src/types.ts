import { Placement } from '@popperjs/core';
import Renderer from './renderers/renderer';

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

export type EmojiCategory =
  | 'recents'
  | 'smileys'
  | 'people'
  | 'animals'
  | 'food'
  | 'activities'
  | 'travel'
  | 'objects'
  | 'symbols'
  | 'flags'
  | 'custom';

export type PickerOptions = {
  renderer?: Renderer;
  rootElement?: HTMLElement;

  showRecents?: boolean;
  showCategoryButtons?: boolean;
  showSearch?: boolean;
  showVariants?: boolean;

  position?: Position;
  referenceElement?: HTMLElement;

  emojisPerRow?: number;

  custom?: CustomEmoji[];
  emojiVersion?: string;
};
