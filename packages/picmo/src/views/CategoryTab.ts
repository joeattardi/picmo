import { View } from './view';

import { Category } from '../types';

import template from './CategoryTab.template';
import classes from './CategoryTabs.scss';

type CategoryTabOptions = {
  category: Category;
  icon: Element;
}

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

  /**
   * Sets the active state of the tab.
   * 
   * @param isActive The new active state
   * @param changeFocus Whether or not to change the active focusable element to the tab button
   * @param scroll Whether or not to scroll to the new category
   */
  setActive(isActive: boolean, changeFocus = true, scroll = false) {
    this.el.classList.toggle(classes.categoryTabActive, isActive);
    if (changeFocus) {
      this.setFocused(isActive, scroll);
    }
    this.isActive = isActive;
  }

  /**
   * Changes the focused state of the tab button.
   * @param isFocused The new active state
   * @param scroll Whether or not to scroll to the new category
   */
  private setFocused(isFocused: boolean, scroll = false) {
    this.ui.button.ariaSelected = isFocused.toString();
    if (isFocused) {
      this.ui.button.tabIndex = 0;
      this.ui.button.focus();

      if (scroll) {
        this.events.emit('category:select', this.category.key, { scroll: 'animate', focus: 'button', performFocus: false });
      }
    } else {
      this.ui.button.tabIndex = -1;
    }
  }

  private selectCategory() {
    if (!this.isActive) {
      this.events.emit('category:select', this.category.key, { scroll: 'animate', focus: 'button', performFocus: true });
    }
  }
}
