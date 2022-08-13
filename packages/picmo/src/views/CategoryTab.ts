import { View } from './view';

import { Category } from '../types';

import template from './CategoryTab.template';
import { getPrefixedClasses } from '../util';


const classes = getPrefixedClasses(
  'categoryTab', 
  'categoryTabActive', 
  'categoryButton'
);

type CategoryTabOptions = {
  category: Category;
  icon: Element;
}

export type SetActiveOptions = {
  changeFocusable?: boolean;
  performFocus?: boolean;
  scroll?: boolean;
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

  /**
   * Sets the active state of the tab.
   * 
   * @param isActive The new active state
   * @param changeFocus Whether or not to change the active focusable element to the tab button
   * @param scroll Whether or not to scroll to the new category
   */
  setActive(active: boolean, options: SetActiveOptions = {}) {
    const { changeFocusable, performFocus, scroll } = {
      changeFocusable: true,
      performFocus: true,
      scroll: true,
      ...options
    };

    this.el.classList.toggle(classes.categoryTabActive, active);

    if (changeFocusable) {
      this.ui.button.tabIndex = active ? 0 : -1;
      this.ui.button.ariaSelected = active.toString();
    }

    if (active && performFocus) {
      this.ui.button.focus();

      if (scroll) {
        this.events.emit('category:select', this.category.key, { scroll: 'animate', focus: 'button', performFocus: false });
      }
    }

    this.isActive = active;
  }

  private selectCategory() {
    if (!this.isActive) {
      this.events.emit('category:select', this.category.key, { scroll: 'animate', focus: 'button', performFocus: true });
    }
  }
}
