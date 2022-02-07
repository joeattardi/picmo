import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import emojiData from './data/emoji';

import { CategoryButtons, categoryIcons } from './categoryButtons';
import { EmojiContainer } from './emojiContainer';
import { RecentsContainer } from './recentsContainer';

import { CATEGORY_CLICKED } from './events';
import { I18NStrings, EmojiButtonOptions, EmojiRecord, EmojiCategory } from './types';
import { queryAllByClass, queryByClass } from './util';
import { clear, load } from './recent';

import template from './templates/emojiArea.ejs';
import { renderTemplate, toElement } from './templates';
import { LazyLoader } from './lazyLoad';

const categorySortOrder = Object.values(EmojiCategory);

const containerClasses = {
  [EmojiCategory.RECENTS]: RecentsContainer
};

function getContainerClass(category: EmojiCategory) {
  return containerClasses[category] || EmojiContainer;
}

export class EmojiArea {
  private headerOffsets: number[];
  private currentCategory = 0;
  private headers: HTMLElement[] = [];
  private categoryButtons: CategoryButtons;
  private emojisPerRow: number;
  private categories: string[];

  private focusedIndex = 0;

  container: HTMLElement;
  emojis: HTMLElement;

  constructor(
    private events: Emitter,
    private i18n: I18NStrings,
    private options: EmojiButtonOptions,
    private emojiCategories: { [key: string]: EmojiRecord[] },
    private lazyLoader: LazyLoader
  ) {
    this.emojisPerRow = options.emojisPerRow || 8;
    this.categories = options.emojiData?.categories || options.categories || emojiData.categories;

    if (options.showRecents) {
      this.categories = ['recents', ...this.categories];
    }

    if (options.custom) {
      this.categories = [...this.categories, 'custom'];
    }

    this.categories.sort((a, b) => categorySortOrder.indexOf(a) - categorySortOrder.indexOf(b));
  }

  async render(): Promise<HTMLElement> {
    if (this.options.showCategoryButtons) {
      this.categoryButtons = new CategoryButtons(this.options, this.events, this.i18n);
    }

    if (this.options.showRecents) {
      this.emojiCategories.recents = load();
    }

    if (this.options.custom) {
      this.emojiCategories.custom = this.options.custom.map(custom => ({
        ...custom,
        custom: true
      }));
    }

    const categoryIconElements = Object.entries(categoryIcons).reduce(
      (result, [category, icon]) => ({
        ...result,
        [`icon-${category}`]: toElement(icon)
      }),
      {}
    );

    const emojiContainers = await Promise.all(this.categories.map(category => this.renderEmojis(category)));

    const categoryEmojiElements = {};
    this.categories.forEach((category, index) => {
      categoryEmojiElements[`emojis-${category}`] = emojiContainers[index];
    });

    this.container = renderTemplate(template, {
      categoryButtons: this.options.showCategoryButtons ? this.categoryButtons?.render() : null,
      categories: this.categories,
      i18n: this.i18n,
      ...categoryIconElements,
      ...categoryEmojiElements
    });

    const recents = this.container.querySelector('h3[data-category="recents"]');
    if (recents) {
      const clearButton = renderTemplate(
        `<button title="<%= i18n.get('recents.clear') %>"><%- icons.clear %></button>`,
        { i18n: this.i18n }
      );
      clearButton.addEventListener('click', () => {
        recents.nextElementSibling.replaceChildren();
        clear();
      });
      recents.appendChild(clearButton);
    }

    this.emojis = queryByClass(this.container, classes.emojis);

    this.headers = [...queryAllByClass<HTMLHeadingElement>(this.container, classes.categoryName)];

    this.emojis.addEventListener('scroll', this.highlightCategory);
    this.emojis.addEventListener('keydown', this.handleKeyDown);

    this.events.on(CATEGORY_CLICKED, this.selectCategory);
    const firstEmoji = this.container.querySelectorAll<HTMLElement>(`.${classes.emoji}`)[0];
    firstEmoji.tabIndex = 0;

    return this.container;
  }

  async renderEmojis(category: string): Promise<HTMLElement> {
    const Container = getContainerClass(category as EmojiCategory);
    return await new Container(
      this.emojiCategories[category],
      true,
      this.events,
      this.options,
      this.lazyLoader
    ).render();
  }

  async reset(): Promise<void> {
    this.headerOffsets = Array.prototype.map.call(this.headers, header => header.offsetTop) as number[];

    this.selectCategory(this.options.initialCategory || 'smileys', false);
    this.currentCategory = this.categories.indexOf((this.options.initialCategory as string) || 'smileys');

    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, false);
    }

    const recents = this.container.querySelector(`h3[data-category="recents"] ~ .${classes.emojiContainer}`);
    if (recents) {
      const recentsLoader = new LazyLoader();
      recents.replaceWith(await new RecentsContainer(load(), true, this.events, this.options, recentsLoader).render());
      recentsLoader.observe(this.emojis);
    }
  }

  private get currentCategoryEl(): HTMLElement {
    return this.emojis.querySelectorAll<HTMLElement>(`.${classes.emojiContainer}`)[this.currentCategory];
  }

  private get focusedEmoji(): HTMLElement {
    return this.currentCategoryEl.querySelectorAll<HTMLElement>(`.${classes.emoji}`)[this.focusedIndex];
  }

  private get currentEmojiCount(): number {
    return this.currentCategoryEl.querySelectorAll<HTMLElement>(`.${classes.emoji}`).length;
  }

  private getEmojiCount(category: number): number {
    const container = this.emojis.querySelectorAll<HTMLElement>(`.${classes.emojiContainer}`)[category];
    return container.querySelectorAll<HTMLElement>(`.${classes.emoji}`).length;
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    switch (event.key) {
      case 'ArrowRight':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === this.currentEmojiCount - 1 && this.currentCategory < this.categories.length - 1) {
          if (this.options.showCategoryButtons) {
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
          if (this.options.showCategoryButtons) {
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
          if (this.options.showCategoryButtons) {
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
          if (this.options.showCategoryButtons) {
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
    requestAnimationFrame(() => this.emojis.addEventListener('scroll', this.highlightCategory));
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

  selectCategory = (category: string, focus = true): void => {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    if (this.focusedEmoji) {
      this.focusedEmoji.tabIndex = -1;
    }

    const categoryIndex = this.categories.indexOf(category);
    this.currentCategory = categoryIndex;
    this.setFocusedEmoji(0, false);
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory, focus);
    }

    const targetPosition = this.headerOffsets[categoryIndex];
    this.emojis.scrollTop = targetPosition;
    requestAnimationFrame(() => this.emojis.addEventListener('scroll', this.highlightCategory));
  };

  highlightCategory = (): void => {
    if (document.activeElement && document.activeElement.classList.contains('emoji-picker__emoji')) {
      return;
    }

    let closestHeaderIndex = this.headerOffsets.findIndex(offset => offset >= Math.round(this.emojis.scrollTop));

    if (this.emojis.scrollTop + this.emojis.offsetHeight === this.emojis.scrollHeight) {
      closestHeaderIndex = -1;
    }

    if (closestHeaderIndex === 0) {
      closestHeaderIndex = 1;
    } else if (closestHeaderIndex < 0) {
      closestHeaderIndex = this.headerOffsets.length;
    }

    if (this.headerOffsets[closestHeaderIndex] === this.emojis.scrollTop) {
      closestHeaderIndex++;
    }

    this.currentCategory = closestHeaderIndex - 1;
    if (this.options.showCategoryButtons) {
      this.categoryButtons.setActiveButton(this.currentCategory);
    }
  };
}
