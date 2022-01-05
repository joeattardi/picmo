import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import emojiData from './data/emoji';

import { CATEGORY_CLICKED } from './events';

import * as icons from './icons';

import { EmojiButtonOptions, I18NCategory, I18NStrings } from './types';

import template from './templates/categoryButtons.ejs';
import { renderTemplate } from './templates';
import { queryAllByClass } from './util';

export const categoryIcons: { [key in I18NCategory]: string } = {
  recents: icons.history,
  smileys: icons.smile,
  people: icons.user,
  animals: icons.cat,
  food: icons.coffee,
  activities: icons.futbol,
  travel: icons.building,
  objects: icons.lightbulb,
  symbols: icons.music,
  flags: icons.flag,
  custom: icons.icons
};

export class CategoryButtons {
  constructor(private options: EmojiButtonOptions, private events: Emitter, private i18n: I18NStrings) {}

  activeButton = 0;

  buttons: NodeListOf<HTMLButtonElement>;

  render(): HTMLElement {
    const categoryData = this.options.categories || this.options.emojiData?.categories || emojiData.categories;

    let categories = this.options.showRecents ? ['recents', ...categoryData] : categoryData;

    if (this.options.custom) {
      categories = [...categories, 'custom'];
    }

    const container = renderTemplate(template, {
      i18n: this.i18n,
      categories,
      categoryIcons,
      fallbackIcon: icons.smile
    });

    this.buttons = queryAllByClass(container, classes.categoryButton);

    this.buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        this.events.emit(CATEGORY_CLICKED, button.dataset.category);
      });
    });

    container.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowRight':
          this.events.emit(CATEGORY_CLICKED, categories[(this.activeButton + 1) % this.buttons.length]);
          break;
        case 'ArrowLeft':
          this.events.emit(
            CATEGORY_CLICKED,
            categories[this.activeButton === 0 ? this.buttons.length - 1 : this.activeButton - 1]
          );
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          event.stopPropagation();
          event.preventDefault();
      }
    });

    return container;
  }

  setActiveButton(activeButton: number, focus = true): void {
    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove(classes.categoryButtonActive);
    activeButtonEl.tabIndex = -1;

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.add(classes.categoryButtonActive);
    activeButtonEl.tabIndex = 0;

    if (focus) {
      activeButtonEl.focus();
    }
  }
}
