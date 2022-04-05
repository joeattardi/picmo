import { View } from './view';

import { Category } from '../types';

import template from '../templates/categoryTab.ejs';
import classes from './CategoryTabs.scss';

type CategoryTabOptions = {
  category: Category;
  icon: string;
}

const focusEventOptions = { scroll: 'animate', focus: 'button', performFocus: true };

export class CategoryTab extends View {
  category: Category;
  private icon: string;
  
  isActive = false;

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

  renderSync(): HTMLElement {
    super.renderSync({
      category: this.category,
      icon: this.icon
    });

    this.ui.button.ariaSelected = 'false';

    return this.el;
  }

  setActive(isActive: boolean, changeFocus = true) {
    this.isActive = isActive;
    this.ui.button.classList.toggle(classes.categoryButtonActive, isActive);
    if (changeFocus) {
      this.setFocused(isActive);
    }
  }

  private setFocused(isFocused: boolean) {
    this.ui.button.ariaSelected = isFocused.toString();
    if (isFocused) {
      this.ui.button.tabIndex = 0;
      this.ui.button.focus();
    } else {
      this.ui.button.tabIndex = -1;
    }
  }

  private selectCategory() {
    if (!this.isActive) {
      this.events.emit('category:select', this.category.key, focusEventOptions);
    }
  }
}
