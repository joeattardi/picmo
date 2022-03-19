import { View } from './view';
import { Category, CategoryKey } from '../types';

import template from '../templates/categoryButtons.ejs';

import classes from './CategoryButtons.scss';

export const categoryIcons: { [key in CategoryKey]?: string } = {
  recents: 'fa-clock-rotate-left',
  'smileys-emotion': 'fa-face-smile',
  'people-body': 'fa-user',
  'animals-nature': 'fa-cat',
  'food-drink': 'fa-mug-saucer',
  activities: 'fa-futbol',
  'travel-places': 'fa-car',
  objects: 'fa-lightbulb',
  symbols: 'fa-icons',
  flags: 'fa-flag',
  custom: 'fa-image'
};

type CategoryButtonsOptions = {
  categories: Category[];
};

export class CategoryButtons extends View {
  private categories: Category[];

  activeButton = 0;

  buttons: NodeListOf<HTMLButtonElement>;

  constructor({ categories }: CategoryButtonsOptions) {
    super({ template, classes });

    this.categories = categories;
  }

  initialize() {
    this.uiElements = {
      activeIndicator: View.byClass(classes.activeIndicator)
    };

    this.uiEvents = [
      View.uiEvent('click', this.handleClickCategory)
    ];
    
    this.keyBindings = {
      ArrowRight: this.selectNextCategory,
      ArrowLeft: this.selectPreviousCategory
    };

    super.initialize();
  }

  selectNextCategory() {
    const nextIndex = this.activeButton === this.buttons.length - 1 ? 0 : this.activeButton + 1;
    this.events.emit('category:select', this.buttons[nextIndex].dataset.category);
  }

  selectPreviousCategory() {
    const previousIndex = this.activeButton === 0 ? this.buttons.length - 1 : this.activeButton - 1;
    this.events.emit('category:select', this.buttons[previousIndex].dataset.category);
  }

  handleClickCategory(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const button = targetElement.closest('button');
    if (button) {
      this.events.emit('category:select', button.dataset.category);
    }
  }

  async render(): Promise<HTMLElement> {
    await super.render({
      categories: this.categories,
      categoryIcons
    });

    this.buttons = this.el.querySelectorAll('button');

    return this.el;
  }

  setActiveButton(activeButton: number, focus = true, animate = true): void {
    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove(classes.categoryButtonActive);
    activeButtonEl.tabIndex = -1;
    activeButtonEl.ariaSelected = 'false';

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.ariaSelected = 'true';
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
