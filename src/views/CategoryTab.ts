import { View } from './view';

import { Category } from '../types';

import template from '../templates/categoryTab.ejs';
import classes from './CategoryButtons.scss';

type CategoryTabOptions = {
  category: Category;
  icon: string;
}

const focusEventOptions = { scroll: 'animate', focus: 'button', performFocus: true };

export class CategoryTab extends View {
  private category: Category;
  private icon: string;

  constructor({ category, icon }: CategoryTabOptions) {
    super({ template, classes });

    this.category = category;
    this.icon = icon;
  }

  initialize() {
    this.uiElements = {
      button: View.byClass(classes.categoryButton)
    }

    this.uiEvents = [
      View.childEvent('button', 'click', this.selectCategory),
      View.childEvent('button', 'focus', this.selectCategory)
    ];

    super.initialize();
  }

  async render(): Promise<HTMLElement> {
    return super.render({
      category: this.category,
      icon: this.icon
    });
  }

  setActive(isActive: boolean, changeFocus = true) {
    this.el.classList.toggle(classes.active, isActive);
    this.ui.button.classList.toggle(classes.categoryButtonActive, isActive);
    if (changeFocus) {
      this.setFocused(isActive);
    }
  }

  private setFocused(isFocused: boolean) {
    if (isFocused) {
      this.ui.button.tabIndex = 0;
      this.ui.button.focus();
    } else {
      this.ui.button.tabIndex = -1;
    }
  }

  selectCategory() {
    this.events.emit('category:select', this.category.key, focusEventOptions);
  }
}
