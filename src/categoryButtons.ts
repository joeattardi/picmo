import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import emojiData from './data/emoji';

import { CATEGORY_CLICKED } from './events';

import { EmojiButtonOptions, I18NCategory, I18NStrings } from './types';

import template from './templates/categoryButtons.ejs';
import { renderTemplate } from './templates';
import { queryAllByClass } from './util';

// import './icons';

export const categoryIcons: { [key in I18NCategory]: string } = {
  recents: 'fa-clock-rotate-left',
  smileys: 'fa-face-smile',
  people: 'fa-user',
  animals: 'fa-cat',
  food: 'fa-mug-saucer',
  activities: 'fa-futbol',
  travel: 'fa-car',
  objects: 'fa-lightbulb',
  symbols: 'fa-icons',
  flags: 'fa-flag',
  custom: 'fa-image'
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

    const icons = Object.entries(categoryIcons).reduce(
      (result, [category, icon]) => ({
        ...result,
        [`icon-${category}`]: icon
      }),
      {}
    );

    const container = renderTemplate(template, {
      i18n: this.i18n,
      categories,
      categoryIcons
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
