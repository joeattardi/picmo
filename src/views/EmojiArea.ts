import { View } from './view';
import classes from './EmojiArea.scss';

import { CategoryButtons } from './CategoryButtons';
import { EmojiCategory } from './EmojiCategory';
import { RecentEmojiCategory } from './RecentEmojiCategory';
import { CustomEmojiCategory } from './CustomEmojiCategory';

import { prefersReducedMotion } from '../util';

import template from '../templates/emojiArea.ejs';
import { LazyLoader } from '../LazyLoader';
import { Category, CategoryKey, CustomEmoji } from '../types';

const categoryClasses = {
  recents: RecentEmojiCategory,
  custom: CustomEmojiCategory
};

function getCategoryClass(category: Category) {
  return categoryClasses[category.key] || EmojiCategory;
}

/**
 * The EmojiArea is the main view of the picker, it contains all the categories and their emojis.
 */
export class EmojiArea extends View {
  private headerOffsets: number[];
  private currentCategory = 0;
  private headers: HTMLElement[] = [];
  private categoryButtons: CategoryButtons;
  private categories: Category[];
  private custom: CustomEmoji[];

  private lazyLoader = new LazyLoader();

  emojiCategories: EmojiCategory[];

  private focusedIndex = 0;

  private cancelScroll: () => void;
  
  constructor() {
    super({ template, classes });
    this.highlightCategory = this.highlightCategory.bind(this);
  }

  initialize() {
    this.appEvents = {
      'category:select': this.selectCategory
    };

    this.uiElements = {
      emojis: View.byClass(classes.emojis)
    };

    super.initialize();
  }
  
  get focusableEmoji(): HTMLElement {
    return this.el.querySelector<HTMLElement>('[tabindex="0"]') as HTMLElement;
  }

  async render(): Promise<HTMLElement> {
    this.categories = await this.emojiData.getCategories();
    
    if (this.options.showRecents) {
      this.categories.unshift({
        key: 'recents',
        message: this.i18n.get('categories.recents'),
        order: -1
      });
    }

    if (this.options.custom) {
      this.categories.push({
        key: 'custom',
        message: this.i18n.get('categories.custom'),
        order: 10
      });
    }

    if (this.options.showCategoryButtons) {
      this.categoryButtons = this.viewFactory.create(CategoryButtons, {
        categories: this.categories,
        showRecents: this.options.showRecents,
        custom: this.custom
      });
    }

    // TODO get custom working again

    this.emojiCategories = this.categories.map(this.createCategory, this);

    // const emojiContainers = await Promise.all(this.emojiCategories.map(emojiCategory => emojiCategory.render()));
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

    this.headers = this.emojiCategories.map(category => category.ui.categoryName);

    // TODO address these when fixing scroll selection and keyboard navigation
    this.ui.emojis.addEventListener('scroll', this.highlightCategory);

    // const [firstEmoji] = this.emojiCategories[0].emojiContainer.emojiElements;
    // if (firstEmoji) {
    //   firstEmoji.tabIndex = 0;
    // }

    this.lazyLoader.observe(this.ui.emojis);

    return this.el;
  }

  private createCategory(category: Category): EmojiCategory {
    const Category = getCategoryClass(category);

    return this.viewFactory.create(Category, {
      category,
      showVariants: true,
      lazyLoader: this.lazyLoader
    });
  }

  async reset(): Promise<void> {
    this.headerOffsets = Array.prototype.map.call(this.headers, header => header.parentElement.offsetTop) as number[];

    this.selectCategory('smileys-emotion', false, false);
    this.currentCategory = this.categories.findIndex(category => category.key === 'smileys-emotion');

    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, false, false);
    }
  }

  /**
   * Scrolls the emoji area to a target position, optionally animating it.
   * 
   * @param targetPosition The final target position.
   * @param animate Whether or not the scroll should be animated.
   * @returns a Promise that is resolved when the scroll is complete.
   */
  private async scrollTo(targetPosition, animate = true): Promise<void> {
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

  async selectCategory(category: CategoryKey, focus = true, animate = true): Promise<void> {
    this.ui.emojis.removeEventListener('scroll', this.highlightCategory);

    const categoryIndex = this.categories.findIndex(c => c.key === category);
    this.currentCategory = categoryIndex;
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, focus, animate);
    }

    await this.scrollTo(this.headerOffsets[categoryIndex], animate);
    this.ui.emojis.addEventListener('scroll', this.highlightCategory)
  }

  highlightCategory(): void {
    if (document.activeElement && document.activeElement.classList.contains('emoji-picker__emoji')) {
      return;
    }

    let closestHeaderIndex = this.headerOffsets.findIndex(offset => offset >= Math.round(this.ui.emojis.scrollTop));

    if (this.ui.emojis.scrollTop + this.ui.emojis.offsetHeight === this.ui.emojis.scrollHeight) {
      closestHeaderIndex = -1;
    }

    if (closestHeaderIndex === 0) {
      closestHeaderIndex = 1;
    } else if (closestHeaderIndex < 0) {
      closestHeaderIndex = this.headerOffsets.length;
    }

    if (this.headerOffsets[closestHeaderIndex] === this.ui.emojis.scrollTop) {
      closestHeaderIndex++;
    }

    this.currentCategory = closestHeaderIndex - 1;
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory);
    }
  }
}
