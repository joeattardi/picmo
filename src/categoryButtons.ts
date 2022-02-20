import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';

import { CustomEmoji } from './types';

import Bundle from './i18n';
import { CATEGORY_CLICKED } from './events';

import template from './templates/categoryButtons.ejs';
import { renderTemplate } from './templates';
import { queryByClass, queryAllByClass } from './util';

import classes from './categoryButtons.module.css';

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

export class CategoryButtons {
  private events: Emitter;
  private i18n: Bundle;
  private showRecents: boolean;
  private custom: CustomEmoji[];

  activeButton = 0;

  buttons: NodeListOf<HTMLButtonElement>;
  private activeIndicator: HTMLElement;

  constructor({ events, i18n, showRecents, custom }: CategoryButtonsOptions) {
    this.events = events;
    this.i18n = i18n;
    this.showRecents = showRecents;
    this.custom = custom;
  }

  render(): HTMLElement {
    const categoryData = emojiData.categories;

    let categories = this.showRecents ? ['recents', ...categoryData] : categoryData;

    if (this.custom) {
      categories = [...categories, 'custom'];
    }

    const container = renderTemplate(template, {
      i18n: this.i18n,
      categories,
      categoryIcons,
      classes
    });

    this.buttons = queryAllByClass(container, classes.categoryButton);
    this.activeIndicator = queryByClass(container, classes.activeIndicator);

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

  setActiveButton(activeButton: number, focus = true, animate = true): void {
    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove(classes.categoryButtonActive);
    activeButtonEl.tabIndex = -1;

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.add(classes.categoryButtonActive);
    activeButtonEl.tabIndex = 0;

    const left = activeButtonEl.offsetLeft;
    this.activeIndicator.style.transition = animate ? 'transform 200ms' : 'none';
    this.activeIndicator.style.transform = `translateX(${left}px)`;

    if (focus) {
      activeButtonEl.focus();
    }
  }
}
