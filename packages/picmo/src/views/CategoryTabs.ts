import { View } from './view';

import { CategoryTab, SetActiveOptions } from './CategoryTab';
import { categoryIcons } from '../icons';
import { Category } from '../types';

import template from './CategoryTabs.template';
import { getPrefixedClasses } from '../util';

type CategoryTabsOptions = {
  categories: Category[];
}

const classes = getPrefixedClasses('categoryButtons', 'categoryButtonsContainer');

export class CategoryTabs extends View {
  private categories: Category[];
  private tabViews: CategoryTab[];
  private activeCategoryIndex = 0;

  constructor({ categories }: CategoryTabsOptions) {
    super({ template, classes });

    this.categories = categories;
  }

  initialize() {
    this.keyBindings = {
      ArrowLeft: this.stepSelectedTab(-1),
      ArrowRight: this.stepSelectedTab(1)
    };

    this.uiEvents = [
      View.uiEvent('scroll', this.checkOverflow)
    ];

    super.initialize();
  }

  checkOverflow() {
    const hasOverflowRight = this.el.scrollLeft < this.el.scrollWidth - this.el.offsetWidth
    const hasOverflowLeft = this.el.scrollLeft > 0;

    this.el.className = 'categoryButtonsContainer';
    if (hasOverflowLeft && hasOverflowRight) {
      this.el.classList.add('has-overflow-both');
    } else if (hasOverflowLeft) {
      this.el.classList.add('has-overflow-left');
    } else if (hasOverflowRight) {
      this.el.classList.add('has-overflow-right');
    }
  }

  renderSync(): HTMLElement {
    this.tabViews = this.categories.map(category => 
      this.viewFactory.create(CategoryTab, { category, icon: categoryIcons[category.key] }));
    
    super.renderSync({
      tabs: this.tabViews.map(view => view.renderSync())
    });

    // console.log(this.el.offsetWidth);
    // this.currentTabView.setActive(true);

    return this.el;
  }

  get currentCategory(): Category {
    return this.categories[this.activeCategoryIndex];
  }

  get currentTabView(): CategoryTab {
    return this.tabViews[this.activeCategoryIndex];
  }

  setActiveTab(index: number, options: SetActiveOptions = {}): void {
    // Don't do anything if the desired tab is already active
    if (index === this.activeCategoryIndex) {
      return;
    }

    this.checkOverflow();
    // this.el.classList.toggle('has-overflow', this.el.offsetWidth < this.el.scrollWidth);
    // console.log(this.el.offsetWidth, this.el.scrollWidth);

    const oldCategory = this.currentTabView;
    const newCategory = this.tabViews[index];

    oldCategory.setActive(false, options);
    newCategory.setActive(true, options);
    this.activeCategoryIndex = index;
  }

  private getTargetCategory(index: number): number {
    if (index < 0) {
      return this.categories.length - 1;
    }

    if (index >= this.categories.length) {
      return 0;
    }

    return index;
  }
  
  private stepSelectedTab(step: number) {
    return () => {
      const newIndex = this.activeCategoryIndex + step;
      this.setActiveTab(this.getTargetCategory(newIndex), {
        changeFocusable: true,
        performFocus: true
      });
    };
  }
}
