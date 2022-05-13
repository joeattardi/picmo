import { View } from './view';
import { CategoryTabs } from './CategoryTabs';
import { EmojiCategory } from './EmojiCategory';
import { RecentEmojiCategory } from './RecentEmojiCategory';
import { CustomEmojiCategory } from './CustomEmojiCategory';
import { throttle } from '../util';
import { LazyLoader } from '../LazyLoader';
import { Category, CategoryKey, EmojiFocusTarget } from '../types';
import { Template } from '../Template';

import classes from './EmojiArea.scss';

const template = new Template(({ classes }) => /* html */`
  <div class="${classes.emojis}">
    <div data-placeholder="emojis"></div>
  </div>
`, { mode: 'async' });

const categoryClasses = {
  recents: RecentEmojiCategory,
  custom: CustomEmojiCategory
};

function getCategoryClass(category: Category) {
  return categoryClasses[category.key] || EmojiCategory;
}

type ScrollListenerState = 
  'active' | // handle scroll events
  'suspend' | // don't handle scroll events
  'resume'; // skip current scroll event then re-enable for the next one

type CategoryFocusTarget = 'button' | EmojiFocusTarget;

type SelectCategoryOptions = {
  focus?: CategoryFocusTarget;
  scroll?: 'animate' | 'jump';
  performFocus?: boolean;
};

function getFocusTarget(focus: CategoryFocusTarget | undefined): EmojiFocusTarget | undefined {
  if (!focus || focus === 'button') {
    return {
      row: 'first',
      offset: 0
    };
  }

  return focus;
}

type EmojiAreaOptions = {
  categoryTabs?: CategoryTabs;
  categories: Category[];
  emojiVersion: number;
}

/**
 * The EmojiArea is the main view of the picker, it contains all the categories and their emojis inside
 * a main scrollable area.
 */
export class EmojiArea extends View {
  private selectedCategory = 0;
  private categoryTabs?: CategoryTabs;
  private categories: Category[];
  private emojiVersion: number;

  private scrollHeight: number;
  private scrollTop: number;
  private observer: ResizeObserver;

  private scrollListenerState: ScrollListenerState = 'active';
  private lazyLoader = new LazyLoader();

  emojiCategories: EmojiCategory[];

  constructor({ categoryTabs, categories, emojiVersion }: EmojiAreaOptions) {
    super({ template, classes });

    this.categoryTabs = categoryTabs;
    this.categories = categories;
    this.emojiVersion = emojiVersion;

    this.handleScroll = throttle(this.handleScroll.bind(this), 100);
  }

  initialize() {
    this.appEvents = { 
      'category:select': this.handleCategorySelect,
      'category:previous': this.focusPreviousCategory,
      'category:next': this.focusNextCategory,
      'focus:change': this.updateFocusedCategory
    };
    this.uiElements = { emojis: View.byClass(classes.emojis) };
    this.uiEvents = [ View.uiEvent('scroll', this.handleScroll) ]

    super.initialize();
  }

  get focusableEmoji(): HTMLElement {
    return this.el.querySelector<HTMLElement>('[tabindex="0"]') as HTMLElement;
  }

  async render(): Promise<HTMLElement> {
    this.emojiCategories = this.categories.map(this.createCategory, this);

    const categoryEmojiElements = {};
    this.categories.forEach((category, index) => {
      categoryEmojiElements[`emojis-${category.key}`] = this.emojiCategories[index];
    });

    await super.render({
      emojis: await Promise.all(this.emojiCategories.map(category => category.render()))
    });

    this.lazyLoader.observe(this.el);

    // We need to watch for changes in the scroll height. This will happen if a new recent emoji is 
    // added such that a new row is added to the recents category, which will shift the scroll height.
    // This will compensate so that from the user's perspective, the scroll position stays the same.
    if (window.ResizeObserver) {
      this.observer = new ResizeObserver(() => {
        const heightChange = this.el.scrollHeight - this.scrollHeight;
        const scrollTopChange = this.el.scrollTop - this.scrollTop;

        if (scrollTopChange === 0 && heightChange > 0) {
          this.el.scrollTop += heightChange;
        }

        this.scrollHeight = this.el.scrollHeight;
        this.scrollTop = this.el.scrollTop;
      });

      this.emojiCategories.forEach(category => {
        this.observer.observe(category.el);
      })
    }

    return this.el;
  }

  destroy() {
    super.destroy();
    this.emojiCategories.forEach(category => {
      this.observer?.unobserve(category.el);
      category.destroy();
    });
  }

  private handleCategorySelect(category: CategoryKey, options?: SelectCategoryOptions) {
    this.selectCategory(category, options);
  }

  private createCategory(category: Category): EmojiCategory {
    const Category = getCategoryClass(category);

    return this.viewFactory.create(Category, {
      category,
      showVariants: true,
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion
    });
  }

  private determineInitialCategory() {
    if (this.options.initialCategory) {
      if (this.categories.find(c => c.key === this.options.initialCategory)) {
        return this.options.initialCategory;
      }
    }

    return this.categories.find(c => c.key !== 'recents')?.key;
  }

  private determineFocusTarget(category) {
    const categoryView = this.emojiCategories.find(c => c.category.key === category);
    if (this.options.initialEmoji && categoryView?.el.querySelector(`[data-emoji="${this.options.initialEmoji}"]`)) {
      return this.options.initialEmoji;
    }

    return 'button'
  }

  reset(): void {
    this.events.emit('preview:hide');

    const category = this.determineInitialCategory();
    if (category) {
      this.selectCategory(category, { 
        focus: this.determineFocusTarget(category), 
        performFocus: true, 
        scroll: 'jump' 
      });

      this.selectedCategory = this.getCategoryIndex(category);
    }
  }

  /**
   * Given a category key, returns the index of the category in the categories array.
   * @param key 
   * @returns 
   */
  private getCategoryIndex(key: CategoryKey): number {
    return this.categories.findIndex(category => category.key === key);
  }

  private focusPreviousCategory(column: number) {
    if (this.selectedCategory > 0) {
      this.focusCategory(this.selectedCategory - 1, { row: 'last', offset: column ?? this.options.emojisPerRow });
    }
  }

  private focusNextCategory(column: number) {
    if (this.selectedCategory < this.categories.length - 1) {
      this.focusCategory(this.selectedCategory + 1, { row: 'first', offset: column ?? 0 });
    }
  }

  /**
   * Changes the focused category.
   * 
   * @param category the index of the category
   * @param focusTarget the desired focus target in the new category
   */
  private focusCategory(category: number, focusTarget: CategoryFocusTarget) {
    this.selectCategory(category, {
      focus: focusTarget,
      performFocus: true
    });
  }

  /**
   * Changes the current category, optionally animating, scrolling, and changing the focus.
   * 
   * Supported options are:
   * - focus: The target element that should become focusable
   * - performFocus: Whether or not to actually focus the new focusable element
   * - scroll: Whether the scrolling should be immediate (jump), animated (animate), or none (undefined).
   * - animate: Whether or not to animate active indicator under the button.
   * 
   * @param category The key or index of the category to select.
   * @param options The options for the category selection.
   */
  private async selectCategory(category: CategoryKey | number, options: SelectCategoryOptions = {}): Promise<void> {
    this.scrollListenerState = 'suspend';
    const { focus, performFocus, scroll } = {
      performFocus: false,
      ...options
    };

    this.emojiCategories[this.selectedCategory].setActive(false);

    const categoryIndex = this.selectedCategory = typeof category === 'number' ? category : this.getCategoryIndex(category);
    this.categoryTabs?.setActiveTab(this.selectedCategory, performFocus, focus === 'button');
    const targetPosition = this.emojiCategories[categoryIndex].el.offsetTop;
    this.emojiCategories[categoryIndex].setActive(true, getFocusTarget(focus), focus !== 'button' && performFocus);

    if (scroll) {
      this.el.scrollTop = targetPosition;
    }

    this.scrollListenerState = 'resume';
  }

  /**
   * Updates the category tabs to reflect the currently focused category.
   * @param category the key of the currently focused category
   */
  private updateFocusedCategory(category: CategoryKey) {
    // Do nothing if this is already the focused category
    if (this.categories[this.selectedCategory].key === category) {
      return;
    }

    this.scrollListenerState = 'suspend';
    this.selectedCategory = this.getCategoryIndex(category);
    this.categoryTabs?.setActiveTab(this.selectedCategory, false);
    this.scrollListenerState = 'resume';
  }

  /**
   * On scroll, checks the new scroll position and highlights a new category if necessary.
   */
  handleScroll(): void {
    // Do nothing if we are in the 'suspend' state or if category tabs are disabled.
    if (this.scrollListenerState === 'suspend' || !this.categoryTabs) {
      return;
    }

    // If we are in the 'resume' state, don't handle the scroll but re-enable the listener for the
    // next scroll event.
    if (this.scrollListenerState === 'resume') {
      this.scrollListenerState = 'active';
      return;
    }

    const currentPosition = this.el.scrollTop;
    const maxScroll = this.el.scrollHeight - this.el.offsetHeight;    

    const targetCategory = this.emojiCategories.findIndex((category: EmojiCategory, index: number) => {
      return currentPosition < (this.emojiCategories[index + 1])?.el.offsetTop;
    });

    if (currentPosition === 0) {
      this.categoryTabs.setActiveTab(0, false);
    } else if (Math.floor(currentPosition) === Math.floor(maxScroll) || targetCategory < 0) {
      this.categoryTabs.setActiveTab(this.categories.length - 1, false);
    } else {
      this.categoryTabs.setActiveTab(targetCategory, false);
    }
  }
}
