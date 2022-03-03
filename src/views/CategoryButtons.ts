import emojiData from '../data/emoji';

import { View } from './view';
import { CustomEmoji } from '../types';

import template from 'templates/categoryButtons.ejs';

import classes from './CategoryButtons.scss';

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
  showRecents: boolean;
  custom: CustomEmoji[];
};

export class CategoryButtons extends View {
  private showRecents: boolean;
  private custom: CustomEmoji[];

  activeButton = 0;

  buttons: NodeListOf<HTMLButtonElement>;

  constructor({ showRecents, custom }: CategoryButtonsOptions) {
    super({ template, classes });

    this.showRecents = showRecents;
    this.custom = custom;
  }

  initialize() {
    this.uiElements = {
      activeIndicator: View.byClass(classes.activeIndicator)
    };

    this.uiEvents = [
      View.uiEvent('click', this.handleClickCategory)
    ];
  }

  handleClickCategory(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const button = targetElement.closest('button');
    if (button) {
      this.events.emit('category:select', button.dataset.category);
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
