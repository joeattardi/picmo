import { View } from './view';
import classes from './emojiArea.scss';

import emojiData from './data/emoji';

import { CategoryButtons } from './categoryButtons';
import { EmojiCategory } from './emojiCategory';
import { RecentEmojiCategory } from './recentEmojiCategory';

import { load } from './recent';
import { prefersReducedMotion } from './util';

import template from './templates/emojiArea.ejs';
import { LazyLoader } from './lazyLoad';
import { CustomEmoji } from './types';

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

    const emojiContainers = await Promise.all(this.emojiCategories.map(emojiCategory => emojiCategory.render()));
    const categoryEmojiElements = {};
    this.categories.forEach((category, index) => {
      categoryEmojiElements[`emojis-${category}`] = emojiContainers[index];
    });

    await super.render({
      categoryButtons: this.showCategoryButtons ? await this.categoryButtons?.render() : null,
      categories: this.categories,
      i18n: this.i18n,
      ...categoryEmojiElements
    });

    this.headers = this.emojiCategories.map(category => category.ui.categoryName);

    // TODO address these when fixing scroll selection and keyboard navigation
    this.ui.emojis.addEventListener('scroll', this.highlightCategory);
    this.ui.emojis.addEventListener('keydown', this.handleKeyDown);

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

  private get focusedEmoji(): HTMLElement {
    return this.emojiCategories[this.currentCategory].emojiContainer.emojiElements[this.focusedIndex];
  }

  private get currentEmojiCount(): number {
    return this.emojiCategories[this.currentCategory].emojiContainer.emojiCount;
  }

  private getEmojiCount(category: number): number {
    return this.emojiCategories[category].emojiContainer.emojiCount;
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    this.ui.emojis.removeEventListener('scroll', this.highlightCategory);
    switch (event.key) {
      case 'ArrowRight':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === this.currentEmojiCount - 1 && this.currentCategory < this.categories.length - 1) {
          if (this.showCategoryButtons) {
            this.categoryButtons.setActiveButton(++this.currentCategory);
          }
          this.setFocusedEmoji(0);
        } else if (this.focusedIndex < this.currentEmojiCount - 1) {
          this.setFocusedEmoji(this.focusedIndex + 1);
        }
        break;
      case 'ArrowLeft':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === 0 && this.currentCategory > 0) {
          if (this.showCategoryButtons) {
            this.categoryButtons.setActiveButton(--this.currentCategory);
          }
          this.setFocusedEmoji(this.currentEmojiCount - 1);
        } else {
          this.setFocusedEmoji(Math.max(0, this.focusedIndex - 1));
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (
          this.focusedIndex + this.emojisPerRow >= this.currentEmojiCount &&
          this.currentCategory < this.categories.length - 1
        ) {
          this.currentCategory++;
          if (this.showCategoryButtons) {
            this.categoryButtons.setActiveButton(this.currentCategory);
          }
          this.setFocusedEmoji(Math.min(this.focusedIndex % this.emojisPerRow, this.currentEmojiCount - 1));
        } else if (this.currentEmojiCount - this.focusedIndex > this.emojisPerRow) {
          this.setFocusedEmoji(this.focusedIndex + this.emojisPerRow);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex < this.emojisPerRow && this.currentCategory > 0) {
          const previousCategoryCount = this.getEmojiCount(this.currentCategory - 1);
          let previousLastRowCount = previousCategoryCount % this.emojisPerRow;
          if (previousLastRowCount === 0) {
            previousLastRowCount = this.emojisPerRow;
          }
          const currentColumn = this.focusedIndex;
          const newIndex =
            currentColumn > previousLastRowCount - 1
              ? previousCategoryCount - 1
              : previousCategoryCount - previousLastRowCount + currentColumn;

          this.currentCategory--;
          if (this.showCategoryButtons) {
            this.categoryButtons.setActiveButton(this.currentCategory);
          }

          this.setFocusedEmoji(newIndex);
        } else {
          this.setFocusedEmoji(
            this.focusedIndex >= this.emojisPerRow ? this.focusedIndex - this.emojisPerRow : this.focusedIndex
          );
        }
        break;
    }
    requestAnimationFrame(() => this.ui.emojis.addEventListener('scroll', this.highlightCategory));
  };

  private setFocusedEmoji(index: number, focus = true): void {
    this.focusedIndex = index;

    if (this.focusedEmoji) {
      this.focusedEmoji.tabIndex = 0;

      if (focus) {
        this.focusedEmoji.focus();
      }
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
    if (this.focusedEmoji) {
      this.focusedEmoji.tabIndex = -1;
    }

    const categoryIndex = this.categories.indexOf(category);
    this.currentCategory = categoryIndex;
    this.setFocusedEmoji(0, false);
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
