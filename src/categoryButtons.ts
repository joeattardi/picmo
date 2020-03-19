import { TinyEmitter as Emitter } from 'tiny-emitter';

const CLASS_CATEGORY_BUTTONS = 'emoji-picker__category-buttons';
const CLASS_CATEGORY_BUTTON = 'emoji-picker__category-button';

import emojiData from './data/emoji';

import { CATEGORY_CLICKED } from './events';

import * as icons from './icons';
import { createElement } from './util';

import { I18NStrings, EmojiButtonOptions, EmojiRecord, I18NCategory } from './types';

const categoryIcons: { [key in I18NCategory]: string } = {
  recents: icons.history,
  smileys: icons.smile,
  people: icons.user,
  animals: icons.cat,
  food: icons.coffee,
  activities: icons.futbol,
  travel: icons.building,
  objects: icons.lightbulb,
  symbols: icons.music,
  flags: icons.flag
};

export class CategoryButtons {
  constructor(private options: EmojiButtonOptions, private events: Emitter) {}

  activeButton = 0;

  buttons: HTMLElement[] = [];

  render(): HTMLElement {
    const container = createElement('div', CLASS_CATEGORY_BUTTONS);

    // if (this.options.showRecents) {
    //   const button = createElement('button', CLASS_CATEGORY_BUTTON);
    //   button.innerHTML = categoryIcons.recents;
    //   container.appendChild(button);
    // }

    emojiData.categories.forEach((category: string) => {
      const button = createElement('button', CLASS_CATEGORY_BUTTON);
      button.innerHTML = categoryIcons[category];
      container.appendChild(button);
      this.buttons.push(button);

      button.addEventListener('click', () => {
        this.events.emit(CATEGORY_CLICKED, category);
      });
    });

    this.buttons[0].classList.add('active');

    return container;
  }

  setActiveButton(activeButton: number) {
    this.buttons[this.activeButton].classList.remove('active');
    this.activeButton = activeButton;
    this.buttons[this.activeButton].classList.add('active');
  }
}
