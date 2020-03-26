import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';
import { i18n as defaultI18n } from './i18n';

import { CategoryButtons } from './categoryButtons';
import { EmojiContainer } from './emojiContainer';

import { CATEGORY_CLICKED } from './events';
import { I18NStrings, EmojiButtonOptions, EmojiRecord } from './types';
import { createElement } from './util';

const EMOJIS_PER_ROW = 8;

const categories: string[] = emojiData.categories;

const emojiCategories: { [key: string]: EmojiRecord[] } = {};
emojiData.emoji.forEach(emoji => {
  let categoryList = emojiCategories[categories[emoji.category]];
  if (!categoryList) {
    categoryList = emojiCategories[categories[emoji.category]] = [];
  }

  categoryList.push(emoji);
});

export class EmojiArea {
  private headerOffsets: number[];
  private currentCategory = 0;
  private headers: HTMLElement[] = [];
  private container: HTMLElement;
  private emojis: HTMLElement;
  private categoryButtons: CategoryButtons;

  private focusedIndex = 0;

  constructor(
    private events: Emitter,
    private i18n: I18NStrings,
    private options: EmojiButtonOptions
  ) {}

  render(): HTMLElement {
    this.container = createElement('div', 'emoji-picker__emoji-area');

    this.categoryButtons = new CategoryButtons(this.options, this.events);
    this.container.appendChild(this.categoryButtons.render());

    this.emojis = createElement('div', 'emoji-picker__emojis');
    Object.keys(emojiCategories).forEach(this.addCategory);

    requestAnimationFrame(() => {
      this.headerOffsets = Array.prototype.map.call(
        this.headers,
        header => header.offsetTop
      ) as number[];
    });

    this.emojis.addEventListener('scroll', this.highlightCategory);
    this.emojis.addEventListener('keydown', this.handleKeyDown);

    this.events.on(CATEGORY_CLICKED, this.selectCategory);

    this.container.appendChild(this.emojis);

    const firstEmoji = this.container.querySelectorAll('.emoji-picker__emoji')[0] as HTMLElement;
    firstEmoji.tabIndex = 0;

    return this.container;
  }

  private get currentCategoryEl(): HTMLElement {
    return this.emojis.querySelectorAll('.emoji-picker__container')[this.currentCategory] as HTMLElement;
  }

  private get focusedEmoji(): HTMLElement {
    return this.currentCategoryEl.querySelectorAll('.emoji-picker__emoji')[this.focusedIndex] as HTMLElement;
  }

  private get currentEmojiCount(): number {
    return this.currentCategoryEl.querySelectorAll('.emoji-picker__emoji').length;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    this.emojis.removeEventListener('scroll', this.highlightCategory);
    switch (event.key) {
      case 'ArrowRight':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === this.currentEmojiCount - 1 && this.currentCategory < categories.length) {
          this.categoryButtons.setActiveButton(++this.currentCategory);
          this.setFocusedEmoji(0);
        } else {
          this.setFocusedEmoji(this.focusedIndex + 1);
        }
        break;  
      case 'ArrowLeft':
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex === 0 && this.currentCategory > 0) {
          this.categoryButtons.setActiveButton(--this.currentCategory);
          this.setFocusedEmoji(this.currentEmojiCount - 1);
        } else {
          this.setFocusedEmoji(Math.max(0, this.focusedIndex - 1));
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex + EMOJIS_PER_ROW >= this.currentEmojiCount && this.currentCategory < categories.length) {
          this.categoryButtons.setActiveButton(++this.currentCategory);
          this.setFocusedEmoji(0);
        } else {
          this.setFocusedEmoji(this.focusedIndex + EMOJIS_PER_ROW);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedEmoji.tabIndex = -1;

        if (this.focusedIndex < EMOJIS_PER_ROW && this.currentCategory > 0) {
          this.categoryButtons.setActiveButton(--this.currentCategory);
          this.setFocusedEmoji(this.currentEmojiCount - 1);
        } else {
          this.setFocusedEmoji(this.focusedIndex >= EMOJIS_PER_ROW ? this.focusedIndex - EMOJIS_PER_ROW : this.focusedIndex);
        }        
        break;
    }
    requestAnimationFrame(() => this.emojis.addEventListener('scroll', this.highlightCategory));
  }

  private setFocusedEmoji(index: number, focus = true): void {
    this.focusedIndex = index;
    this.focusedEmoji.tabIndex = 0;

    if (focus) {
      this.focusedEmoji.focus();
    }
  }

  private addCategory = (category: string): void => {
    const name = createElement('h2', 'emoji-picker__category-name');
    name.innerHTML =
      this.i18n.categories[category] || defaultI18n.categories[category];
    this.emojis.appendChild(name);
    this.headers.push(name);

    this.emojis.appendChild(
      new EmojiContainer(
        emojiCategories[category],
        true,
        this.events,
        this.options
      ).render()
    );
  };

  selectCategory = (category: string): void => {
    const categoryIndex = categories.indexOf(category);
    const targetPosition = this.headerOffsets[categoryIndex];
    this.emojis.scrollTop = targetPosition;

    this.focusedEmoji.tabIndex = -1;

    setTimeout(() => {
      this.setFocusedEmoji(0, false);
      this.categoryButtons.setActiveButton(this.currentCategory)
    });
  };

  highlightCategory = (): void => {
    if (document.activeElement?.classList.contains('emoji-picker__emoji')) {
      return; 
    }

    let closestHeaderIndex = this.headerOffsets.findIndex(
      offset => offset > this.emojis.scrollTop
    );

    if (closestHeaderIndex === 0) {
      closestHeaderIndex = 1;
    } else if (closestHeaderIndex < 0) {
      closestHeaderIndex = this.headerOffsets.length;
    }

    this.currentCategory = closestHeaderIndex - 1;
    this.categoryButtons.setActiveButton(this.currentCategory);
  };
}
