import { Placement } from '@popperjs/core';
import { Rule } from 'jss';
import { EmojiButton } from './index';
import { ParseObject } from 'twemoji';
import Renderer from './renderers/renderer';

export type CustomEmoji = {
  name: string;
  url: string;
};

export type PickerOptions = {
  renderer?: Renderer;
  rootElement?: HTMLElement;

  showSearch?: boolean;

  referenceElement?: HTMLElement;

  emojisPerRow?: number;

  custom?: CustomEmoji[];
  emojiVersion?: string;
};
