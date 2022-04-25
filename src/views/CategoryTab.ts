import { View } from './view';

import { Category } from '../types';
import { Template } from '../Template';
import classes from './CategoryTabs.scss';

type CategoryTabOptions = {
  category: Category;
  icon: Element;
}

const focusEventOptions = { scroll: 'animate', focus: 'button', performFocus: true };

const template = new Template(({ classes, i18n, category, pickerId, icon }) => /* html */`
  <li class="${classes.categoryTab}">
    <button
      aria-selected="false"
      role="tab"
      class="${classes.categoryButton}"
      tabindex="-1"
      title="${i18n.get(`categories.${category.key}`, category.message || category.key)}"
      type="button"
      data-category="${category.key}"
      id="${pickerId}-category-${category.key}"
    >
      <i data-icon="${icon}"></i>
  </li>
`);

export class CategoryTab extends View {
  category: Category;
  private icon: Element;
  
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
    this.el.classList.toggle(classes.categoryTabActive, isActive);
    // this.ui.button.classList.toggle(classes.categoryButtonActive, isActive);
    if (changeFocus) {
      this.setFocused(isActive);
    }
    this.isActive = isActive;
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
