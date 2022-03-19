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

type CategoryLink = {
  category: Category;
  offset: number;
}

type CategoryLinks = {
  previous: CategoryLink | null;
  current: CategoryLink;
  next: CategoryLink | null;
  last: CategoryLink;
}

/**
 * The EmojiArea is the main view of the picker, it contains all the categories and their emojis.
 */
export class EmojiArea extends View {
  private currentCategory = 0;
  private categoryButtons: CategoryButtons;
  private categories: Category[];
  private custom: CustomEmoji[];

  private listenForScroll = true;
  private lazyLoader = new LazyLoader();

  emojiCategories: EmojiCategory[];

  private cancelScroll: () => void;

  constructor() {
    super({ template, classes });
    this.handleScroll = this.handleScroll.bind(this);
  }

  initialize() {
    this.appEvents = { 'category:select': this.selectCategory };
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

  private createCategory(category: Category): EmojiCategory {
    const Category = getCategoryClass(category);

    return this.viewFactory.create(Category, {
      category,
      showVariants: true,
      lazyLoader: this.lazyLoader
    });
  }

  async reset(): Promise<void> {
    this.events.emit('preview:hide');

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
    // We don't want to trigger the auto selection, so pause scroll listening here.
    this.listenForScroll = false;

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
   * Creates a CategoryLink for the category at the given offset from the current index.
   * @param offset The offset from the current index.
   * @returns a CategoryLink for the desired category, or null if the given offset does not to a valid category
   */
  private getCategoryLink(offset = 0): CategoryLink | null {
    const index = this.currentCategory + offset;
    if (index < 0 || index > this.categories.length - 1) {
      return null;
    }

    return {
      category: this.categories[index],
      offset: this.emojiCategories[index].el.offsetTop
    }
  }

  /**
   * Calculates the set of category links from the current category
   * @returns the CategoryLinks for the current category
   */
  private getCategoryLinks(): CategoryLinks {
    return {
      previous: this.getCategoryLink(-1),
      current: this.getCategoryLink(0) as CategoryLink,
      next: this.getCategoryLink(1),
      last: this.getCategoryLink(this.categories.length - 1 - this.currentCategory) as CategoryLink
    };
  }

  async selectCategory(category: CategoryKey, focus = true, animate = true): Promise<void> {
    const categoryIndex = this.categories.findIndex(c => c.key === category);
    this.currentCategory = categoryIndex;
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, focus, animate);
    }

    const targetPosition = this.emojiCategories[categoryIndex].el.offsetTop;
    await this.scrollTo(targetPosition, animate);

    // Scroll is complete, so we can resume listening for scroll events.
    this.listenForScroll = true;
  }

  /**
   * Changes the highlighted category to the one pointed to by the given link.
   * @param link the target link to be highlighted
   */
  highlightCategory(link: CategoryLink | null): void {
    if (link) {
      const { category } = link;
      this.currentCategory = this.categories.indexOf(category);
      if (this.options.showCategoryButtons) {
        this.categoryButtons.setActiveButton(this.currentCategory, false, true);
      }
    }
  }

  /**
   * On scroll, checks the new scroll position and highlights a new category if necessary.
   */
  handleScroll(): void {
    if (!this.listenForScroll) {
      return;
    }

    const currentPosition = this.ui.emojis.scrollTop;
    const maxScroll = this.ui.emojis.scrollHeight - this.ui.emojis.offsetHeight;    
    const { previous, current, next, last } = this.getCategoryLinks();

    if (currentPosition < current.offset) {
      this.highlightCategory(previous);
    } else if (next && currentPosition >= next.offset) {
      this.highlightCategory(next);
    } else if (currentPosition === maxScroll) {
      this.highlightCategory(last);
    }
  }
}
