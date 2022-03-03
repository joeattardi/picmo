import { View } from './view';
import classes from './EmojiArea.scss';

import emojiData from '../data/emoji';

import { CategoryButtons } from './CategoryButtons';
import { EmojiCategory } from './EmojiCategory';
import { RecentEmojiCategory } from './RecentEmojiCategory';

import { load } from '../recent';
import { prefersReducedMotion } from '../util';

import template from 'templates/emojiArea.ejs';
import { LazyLoader } from '../LazyLoader';
import { CustomEmoji } from '../types';

const categorySortOrder = Object.values(EmojiCategory);

const categoryClasses = {
  recents: RecentEmojiCategory
};

function getCategoryClass(category) {
  return categoryClasses[category] || EmojiCategory;
}

type EmojiAreaOptions = {
  emojiCategoryData: any;
  lazyLoader?: LazyLoader;
  emojisPerRow: number;
  custom: CustomEmoji[];
  showCategoryButtons: boolean;
  showRecents: boolean;
  emojiVersion: string;
};
export class EmojiArea extends View {
  private headerOffsets: number[];
  private currentCategory = 0;
  private headers: HTMLElement[] = [];
  private categoryButtons: CategoryButtons;
  private emojisPerRow: number;
  private categories: string[];
  private custom: CustomEmoji[];

  private emojiCategoryData: any;
  private lazyLoader?: LazyLoader;

  emojiCategories: EmojiCategory[];

  private showCategoryButtons: boolean;
  private showRecents: boolean;

  private emojiVersion: string;

  private focusedIndex = 0;

  private cancelScroll: () => void;

  constructor({
    emojiCategoryData,
    lazyLoader,
    emojisPerRow,
    custom,
    showCategoryButtons,
    showRecents,
    emojiVersion
  }: EmojiAreaOptions) {
    super({ template, classes });

    this.emojisPerRow = emojisPerRow;
    this.categories = emojiData.categories;

    this.showCategoryButtons = showCategoryButtons;
    this.showRecents = showRecents;

    this.lazyLoader = lazyLoader;

    this.emojiCategoryData = emojiCategoryData;
    this.emojiVersion = emojiVersion;

    if (showRecents) {
      this.categories = ['recents', ...this.categories];
    }

    if (custom) {
      this.custom = custom;
      this.categories = [...this.categories, 'custom'];
    }

    this.categories.sort((a, b) => categorySortOrder.indexOf(a) - categorySortOrder.indexOf(b));

    this.highlightCategory = this.highlightCategory.bind(this);
  }

  initialize() {
    this.appEvents = {
      'category:select': this.selectCategory
    };

    this.uiElements = {
      emojis: View.byClass(classes.emojis)
    };
  }
  
  async render(): Promise<HTMLElement> {
    if (this.showCategoryButtons) {
      this.categoryButtons = this.viewFactory.create(CategoryButtons, {
        showRecents: this.showRecents,
        custom: this.custom
      });
    }

    if (this.showRecents) {
      this.emojiCategoryData.recents = load();
    }

    if (this.custom) {
      this.emojiCategoryData.custom = this.custom;
    }

    this.emojiCategories = this.categories.map(this.createCategory, this);

    // const emojiContainers = await Promise.all(this.emojiCategories.map(emojiCategory => emojiCategory.render()));
    const categoryEmojiElements = {};
    this.categories.forEach((category, index) => {
      categoryEmojiElements[`emojis-${category}`] = this.emojiCategories[index];
    });

    await super.render({
      categoryButtons: this.showCategoryButtons ? this.categoryButtons : null,
      categories: this.categories,
      i18n: this.i18n,
      ...categoryEmojiElements
    });

    this.headers = this.emojiCategories.map(category => category.ui.categoryName);

    // TODO address these when fixing scroll selection and keyboard navigation
    this.ui.emojis.addEventListener('scroll', this.highlightCategory);

    const [firstEmoji] = this.emojiCategories[0].emojiContainer.emojiElements;
    if (firstEmoji) {
      firstEmoji.tabIndex = 0;
    }

    return this.el;
  }

  private createCategory(category: string): EmojiCategory {
    const Category = getCategoryClass(category);

    return this.viewFactory.create(Category, {
      category,
      showVariants: true,
      emojis: this.emojiCategoryData[category],
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion
    });
  }

  async reset(): Promise<void> {
    this.headerOffsets = Array.prototype.map.call(this.headers, header => header.parentElement.offsetTop) as number[];

    this.selectCategory('smileys', false, false);
    this.currentCategory = this.categories.indexOf('smileys');

    if (this.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, false, false);
    }
  }

  private async scrollTo(targetPosition, animate = true) {
    this.cancelScroll?.();

    let isCancelled = false;
    this.cancelScroll = () => isCancelled = true;

    return new Promise<void>(resolve => {
      if (animate && !prefersReducedMotion()) {
        const difference = targetPosition - this.ui.emojis.scrollTop;
        const step = difference / 7;

        let previous;
        const scrollStep = time => {
          if (!previous) {
            previous = time;
          }

          if (isCancelled) {
            this.ui.emojis.scrollTop = targetPosition;
          }

          if (time - previous >= (1000/60)) {
            if (targetPosition !== this.ui.emojis.scrollTop) {
              const currentDifference = targetPosition - this.ui.emojis.scrollTop;
              const nextStep = Math.abs(currentDifference) > Math.abs(step) && Math.sign(currentDifference) === Math.sign(step) ? step : currentDifference;
              this.ui.emojis.scrollTop += nextStep;
              previous = time;
              requestAnimationFrame(scrollStep);
            } else {
              resolve();
            }
          } else {
            requestAnimationFrame(scrollStep);
          }
        };
    
        requestAnimationFrame(scrollStep);
      } else {
        this.ui.emojis.scrollTop = targetPosition;
        resolve();
      }
    });
  }

  async selectCategory(category: string, focus = true, animate = true): Promise<void> {
    this.ui.emojis.removeEventListener('scroll', this.highlightCategory);

    const categoryIndex = this.categories.indexOf(category);
    this.currentCategory = categoryIndex;
    if (this.showCategoryButtons) {
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
    if (this.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory);
    }
  }
}
