import { TinyEmitter as Emitter } from 'tiny-emitter';

const CLASS_CATEGORY_BUTTONS = 'emoji-picker__category-buttons';
const CLASS_CATEGORY_BUTTON = 'emoji-picker__category-button';

import emojiData from './data/emoji';

import { CATEGORY_CLICKED } from './events';

import * as icons from './icons';
import { createElement } from './util';

import { EmojiButtonOptions, I18NCategory } from './types';

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
      button.tabIndex = -1;
      container.appendChild(button);
      this.buttons.push(button);

      button.addEventListener('click', () => {
        this.events.emit(CATEGORY_CLICKED, category);
      });
    });

    this.buttons[0].classList.add('active');
    this.buttons[0].tabIndex = 0;

    container.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        this.events.emit(CATEGORY_CLICKED, emojiData.categories[(this.activeButton + 1) % this.buttons.length]);
      } else if (event.key === 'ArrowLeft') {
        this.events.emit(CATEGORY_CLICKED, emojiData.categories[this.activeButton === 0 ? this.buttons.length - 1 : this.activeButton - 1]);
      }
    });

    return container;
  }

  setActiveButton(activeButton: number): void {
    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove('active');
    activeButtonEl.tabIndex = -1;

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.add('active');
    activeButtonEl.tabIndex = 0;
    activeButtonEl.focus();
  }
}
