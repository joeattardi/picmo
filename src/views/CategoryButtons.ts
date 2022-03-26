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
    this.emitSelectEvent(this.buttons[nextIndex].dataset.category as CategoryKey);
  }

  selectPreviousCategory() {
    const previousIndex = this.activeButton === 0 ? this.buttons.length - 1 : this.activeButton - 1;
    this.emitSelectEvent(this.buttons[previousIndex].dataset.category as CategoryKey);
  }

  handleClickCategory(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const button = targetElement.closest('button');
    if (button) {
      this.emitSelectEvent(button.dataset.category as CategoryKey);
    }
  }

  private emitSelectEvent(category: CategoryKey) {
    this.events.emit('category:select', category, { scroll: 'animate', focus: 'button', performFocus: true, animate: true });
  }

  async render(): Promise<HTMLElement> {
    await super.render({
      categories: this.categories,
      categoryIcons
    });

    this.buttons = this.el.querySelectorAll('button');

    this.buttons.forEach((button: HTMLElement) => {
      button.addEventListener('focus', () => {
        this.events.emit('category:select', button.dataset.category as CategoryKey, { scroll: 'animate', focus: 'button', performFocus: true, animate: true });
      });
    });

    return this.el;
  }

  getActiveButton(): number {
    return this.activeButton;
  }

  setActiveButton(activeButton: number, focus = true, animate = true): void {
    // Don't do anything if it's the same button
    if (activeButton === this.activeButton) {
      return;
    }

    const currentButton = this.buttons[this.activeButton];
    const newButton = this.buttons[activeButton];

    // Change the focused button and aria-selected state if the focus option is true.
    if (focus) {
      currentButton.tabIndex = -1;
      currentButton.ariaSelected = 'false';

      newButton.tabIndex = 0;
      newButton.ariaSelected = 'true';
      newButton.focus();
    }

    let activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.remove(classes.categoryButtonActive);

    this.activeButton = activeButton;

    activeButtonEl = this.buttons[this.activeButton];
    activeButtonEl.classList.add(classes.categoryButtonActive);

    const left = activeButtonEl.offsetLeft;
    this.ui.activeIndicator.style.transition = animate ? 'transform 200ms' : 'none';
    this.ui.activeIndicator.style.transform = `translateX(${left}px)`;
  }
}
