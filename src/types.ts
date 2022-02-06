import { Placement } from '@popperjs/core';
import { Rule } from 'jss';
import { EmojiButton } from './index';
import { ParseObject } from 'twemoji';
import { ParseObject } from 'twemoji';
import { EmojiButton } from './index';
import Renderer from './renderers/renderer';

export interface EmojiRecord {
  name: string;
  emoji: string;
  custom?: boolean;
  category?: number;
  version?: string;
  variations?: string[];
  key?: string;
}

export interface EmojiData {
  categories: string[];
  emoji: EmojiRecord[];
}

export type EmojiSelection = {
  content: HTMLElement;
  emoji: EmojiRecord;
};

export interface EmojiSelectionOLD {
  name: string;
  custom?: boolean;
  emoji?: string;
  url?: string;
}

export interface RecentEmoji {
  key: string;
  name: string;
  emoji: string;
  custom?: boolean;
}

export interface EmojiEventData {
  emoji: EmojiRecord;
  showVariants: boolean;
  button: HTMLElement;
}

export interface Plugin {
  render(picker: EmojiButton): HTMLElement;
  destroy?(): void;
}

export type Theme = {
  theme: { [key: string]: string };
};

// TODO make this required and use Partial for typing the passed in options
// TODO fix the type problems with optionals here. Define a type for the passed in options,
// mark which are required/optional, and then have individual class properties for these?
export interface EmojiButtonOptions {
  locale?: { [key: string]: string };
  position?: Placement | FixedPosition;
  autoHide?: boolean;
  autoFocusSearch?: boolean;
  showAnimation?: boolean;
  showPreview?: boolean;
  showSearch?: boolean;
  showRecents?: boolean;
  showVariants?: boolean;
  showCategoryButtons?: boolean;
  recentsCount?: number;
  rootElement?: HTMLElement;
  emojiData?: EmojiData;
  emojiVersion?: EmojiVersion;
  zIndex?: number;
  theme?: Theme;
  categories?: EmojiCategory[];
  style?: EmojiStyle;
  twemojiOptions?: Partial<ParseObject>;
  emojisPerRow?: number;
  rows?: number;
  emojiSize?: string;
  initialCategory?: EmojiCategory;
  custom?: EmojiRecord[];
  plugins?: Plugin[];
  icons?: Icons;
  renderer?: Renderer;
  styleProperties?: { [key: string]: string };
}

export interface FixedPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export type EmojiStyle = 'native' | 'twemoji';

export type EmojiVersion = '1.0' | '2.0' | '3.0' | '4.0' | '5.0' | '11.0' | '12.0' | '12.1';

export enum EmojiCategory {
  RECENTS = 'recents',
  SMILEYS = 'smileys',
  PEOPLE = 'people',
  ANIMALS = 'animals',
  FOOD = 'food',
  ACTIVITIES = 'activities',
  TRAVEL = 'travel',
  OBJECTS = 'objects',
  SYMBOLS = 'symbols',
  FLAGS = 'flags',
  CUSTOM = 'custom'
}

export interface Icons {
  search?: string;
  clearSearch?: string;
  categories?: {
    [key in EmojiCategory]?: string;
  };
  notFound?: string;
}
