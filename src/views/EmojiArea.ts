import scrollSmooth from 'scroll-smooth';

import { View } from './view';
import classes from './EmojiArea.scss';

import { CategoryButtons } from './CategoryButtons';
import { EmojiCategory } from './EmojiCategory';
import { RecentEmojiCategory } from './RecentEmojiCategory';
import { CustomEmojiCategory } from './CustomEmojiCategory';

import { prefersReducedMotion } from '../util';

import template from '../templates/emojiArea.ejs';
import { LazyLoader } from '../LazyLoader';
import { Category, CategoryKey, CustomEmoji, EmojiRecord, EmojiFocusTarget } from '../types';
import { Bundle } from '../i18n';

const categoryClasses = {
  recents: RecentEmojiCategory,
  custom: CustomEmojiCategory
};

function getCategoryClass(category: Category) {
  return categoryClasses[category.key] || EmojiCategory;
}

// TODO: put these two extra categories in the database and just grab them that way?
function createCategory(key: CategoryKey, i18n: Bundle, order: number): Category {
  return {
    key,
    order,
    message: i18n.get(`categories.${key}`)
  };
}

type CategoryFocusTarget = 'button' | EmojiFocusTarget;
type SelectCategoryOptions = {
  focus?: CategoryFocusTarget;
  scroll?: 'animate' | 'jump';
  animate?: boolean;
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

/**
 * The EmojiArea is the main view of the picker, it contains all the categories and their emojis inside
 * a main scrollable area.
 */
export class EmojiArea extends View {
  private selectedCategory = 0;
  private categoryButtons: CategoryButtons;
  private categories: Category[];
  private custom: CustomEmoji[];

  private listenForScroll = true;
  private lazyLoader = new LazyLoader();

  emojiCategories: EmojiCategory[];

  private cancelScroll: () => void;

  constructor() {
    super({ template, classes });
  }

  initialize() {
    this.appEvents = { 
      'category:select': this.handleCategorySelect,
      'category:previous': this.focusPreviousCategory,
      'category:next': this.focusNextCategory,
      'focus:change': this.updateFocusedCategory
    };
    this.uiElements = { emojis: View.byClass(classes.emojis) };
    this.uiEvents = [ View.childEvent('emojis', 'scroll', this.handleScroll) ]

    super.initialize();
  }
  
  get focusableEmoji(): HTMLElement {
    return this.el.querySelector<HTMLElement>('[tabindex="0"]') as HTMLElement;
  }

  async render(): Promise<HTMLElement> {
    this.categories = await this.emojiData.getCategories();
    
    if (this.options.showRecents) {
      this.categories.unshift(createCategory('recents', this.i18n, -1));
    }

    if (this.options.custom) {
      this.categories.push(createCategory('custom', this.i18n, 10));
    }

    if (this.options.showCategoryButtons) {
      this.categoryButtons = this.viewFactory.create(CategoryButtons, {
        categories: this.categories,
        showRecents: this.options.showRecents,
        custom: this.custom
      });
    }

    this.emojiCategories = this.categories.map(this.createCategory, this);

    const categoryEmojiElements = {};
    this.categories.forEach((category, index) => {
      categoryEmojiElements[`emojis-${category.key}`] = this.emojiCategories[index];
    });

    await super.render({
      categoryButtons: this.options.showCategoryButtons ? this.categoryButtons : null,
      categories: this.categories,
      i18n: this.i18n,
      ...categoryEmojiElements
    });

    this.lazyLoader.observe(this.ui.emojis);

    return this.el;
  }

  private handleCategorySelect(category: CategoryKey, options?: SelectCategoryOptions) {
    this.selectCategory(category, options);
  }

  private createCategory(category: Category): EmojiCategory {
    const Category = getCategoryClass(category);

    return this.viewFactory.create(Category, {
      category,
      showVariants: true,
      lazyLoader: this.lazyLoader
    });
  }

  reset(): void {
    this.events.emit('preview:hide');

    this.selectCategory('smileys-emotion', { focus: 'button', performFocus: true, scroll: 'jump' });
    this.selectedCategory = this.getCategoryIndex('smileys-emotion');
  }

  /**
   * Scrolls the emoji area to a target position, optionally animating it.
   * 
   * @param targetPosition The final target position.
   * @param animate Whether or not the scroll should be animated.
   * @returns a Promise that is resolved when the scroll is complete.
   */
  private async scrollTZo(targetPosition, animate = true): Promise<void> {
    // We don't want to trigger the auto selection, so pause scroll listening here.
    this.suspendScrollListener();

    // If a scroll animation is already in progress, cancel it and jump to the end
    // before starting this one.
    this.cancelScroll?.();

    let isCancelled = false;
    this.cancelScroll = () => isCancelled = true;

    const { emojis } = this.ui;

    return new Promise<void>(resolve => {
      if (animate && !prefersReducedMotion()) {
        const difference = targetPosition - emojis.scrollTop;
        const step = difference / 7;

        let previous;
        const scrollStep = time => {
          if (!previous) {
            previous = time;
          }

          // If the scroll operation was cancelled, immediately jump to the target position.
          if (isCancelled) {
            emojis.scrollTop = targetPosition;
          }

          // If we are scrolling down, check to see if there is still scrollable area below the current position.
          // If we have hit the end, we can't scroll any further and should bail out to prevent an infinite loop.
          const canScroll = emojis.scrollHeight - emojis.scrollTop > emojis.offsetHeight || difference < 0;
          
          // Aim for 60fps.
          if (time - previous >= (1000/60)) {
            if (targetPosition !== emojis.scrollTop && canScroll) {
              // If we haven't reached the target position yet - and we can still scroll - continue the scroll animation.
              const currentDifference = targetPosition - emojis.scrollTop;
              const nextStep = Math.abs(currentDifference) > Math.abs(step) && Math.sign(currentDifference) === Math.sign(step) ? step : currentDifference;
              emojis.scrollTop += nextStep;
              previous = time;
              requestAnimationFrame(scrollStep);
            } else {
              // Otherwse we either have reached the target position or can't scroll down any further.
              resolve();
            }
          } else {
            // Not enough time has passed yet, request a new frame.
            requestAnimationFrame(scrollStep);
          }
        };
    
        // Start the scroll animation.
        requestAnimationFrame(scrollStep);
      } else {
        emojis.scrollTop = targetPosition;
        resolve();
      }
    });
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
      this.focusCategory(this.selectedCategory - 1, { row: 'last', offset: column ?? this.options.emojisPerRow});
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
      animate: true,
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
    const { focus, performFocus, scroll, animate } = {
      performFocus: false,
      animate: false,
      ...options
    };

    this.emojiCategories[this.selectedCategory].setActive(false);

    const categoryIndex = this.selectedCategory = typeof category === 'number' ? category : this.getCategoryIndex(category);
    this.categoryButtons?.setActiveButton(this.selectedCategory, focus === 'button' && performFocus, animate);
    const targetPosition = this.emojiCategories[categoryIndex].el.offsetTop;
    this.emojiCategories[categoryIndex].setActive(true, getFocusTarget(focus), focus !== 'button' && performFocus);

    if (scroll) {
      this.suspendScrollListener();
      this.ui.emojis.scrollTop = targetPosition;
    }
  }

  /**
   * Updates the category tabs to reflect the currently focused category.
   * @param category the key of the currently focused category
   */
  private updateFocusedCategory(emoji: EmojiRecord, category: CategoryKey) {
    this.suspendScrollListener();
    this.selectedCategory = this.getCategoryIndex(category);
    this.categoryButtons?.setActiveButton(this.selectedCategory, false, true);
  }

  /**
   * Sets a flag that will stop listening for scroll events. The listener will remain suspended
   * until resumed.
   */
  private suspendScrollListener() {
    this.listenForScroll = false;
  }

  /**
   * On scroll, checks the new scroll position and highlights a new category if necessary.
   */
  handleScroll(): void {
    // If we paused the listener, re-enable the flag but then skip this event.
    if (!this.listenForScroll) {
      this.listenForScroll = true;
      return;
    }

    const currentPosition = this.ui.emojis.scrollTop;
    const maxScroll = this.ui.emojis.scrollHeight - this.ui.emojis.offsetHeight;    

    const targetCategory = this.emojiCategories.findIndex((category: EmojiCategory) => {
      return category.el.offsetTop >= currentPosition;
    });

    // TODO: Almost there! Need to fix syncing the focused to highlight
    // TODO: Emoji button view can emit event to make sure focus stays in sync.
    if (currentPosition === 0) {
      this.categoryButtons.setActiveButton(0, false);
    } else if (Math.floor(currentPosition) === Math.floor(maxScroll) || targetCategory < 0) {
      this.categoryButtons.setActiveButton(this.categories.length - 1, false);
    } else {
      this.categoryButtons.setActiveButton(targetCategory - 1, false);
    }
  }
}
