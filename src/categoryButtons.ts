import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';

import { View } from './view';
import { CustomEmoji } from './types';

import Bundle from './i18n';
import { CATEGORY_CLICKED } from './events';

import template from './templates/categoryButtons.ejs';

import classes from './categoryButtons.scss';

export const categoryIcons = {
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

type CategoryButtonsOptions = {
  events: Emitter;
  i18n: Bundle;
  showRecents: boolean;
  custom: CustomEmoji[];
};

export class CategoryButtons extends View {
  private events: Emitter;
  private i18n: Bundle;
  private showRecents: boolean;
  private custom: CustomEmoji[];

  activeButton = 0;

  buttons: NodeListOf<HTMLButtonElement>;

  uiElements = {
    activeIndicator: View.byClass(classes.activeIndicator)
  }

  uiEvents = [
    View.listen('click', this.handleClickCategory)
  ];

  constructor({ events, i18n, showRecents, custom }: CategoryButtonsOptions) {
    super(template, classes);

    this.events = events;
    this.i18n = i18n;
    this.showRecents = showRecents;
    this.custom = custom;
  }

  handleClickCategory(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const button = targetElement.closest('button');
    if (button) {
      this.events.emit(CATEGORY_CLICKED, button.dataset.category);
    }
  }

  async render(): Promise<HTMLElement> {
    const categoryData = emojiData.categories;

    let categories = this.showRecents ? ['recents', ...categoryData] : categoryData;

    if (this.custom) {
      categories = [...categories, 'custom'];
    }

    await super.render({
      i18n: this.i18n,
      categories,
      categoryIcons
    });

    this.buttons = this.el.querySelectorAll('button');

    this.el.addEventListener('keydown', event => {
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

    return this.el;
  }

  setActiveButton(activeButton: number, focus = true, animate = true): void {
    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove(classes.categoryButtonActive);
    activeButtonEl.tabIndex = -1;

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.add(classes.categoryButtonActive);
    activeButtonEl.tabIndex = 0;

    const left = activeButtonEl.offsetLeft;
    this.ui.activeIndicator.style.transition = animate ? 'transform 200ms' : 'none';
    this.ui.activeIndicator.style.transform = `translateX(${left}px)`;

    if (focus) {
      activeButtonEl.focus();
    }
  }
}
