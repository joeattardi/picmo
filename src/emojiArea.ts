import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';
import { i18n as defaultI18n } from './i18n';

import { CategoryButtons } from './categoryButtons';
import { EmojiContainer } from './emojiContainer';

import { CATEGORY_CLICKED } from './events';
import {
  I18NStrings,
  EmojiButtonOptions,
  EmojiRecord
} from './types';
import { createElement } from './util';

const categories: string[] = emojiData.categories;

const emojiCategories: { [key: string]: EmojiRecord[] } = {};
emojiData.emoji.forEach(emoji => {
  let categoryList = emojiCategories[categories[emoji.category]];
  if (!categoryList) {
    categoryList = emojiCategories[categories[emoji.category]] = [];
  }

  categoryList.push(emoji);
});

const SCROLL_ANIMATION_TIME = 150;
const SCROLL_ANIMATION_INTERVAL = 10;
const SCROLL_ANIMATION_STEPS = SCROLL_ANIMATION_TIME / SCROLL_ANIMATION_INTERVAL;

export class EmojiArea {
  private headerOffsets: number[];
  private currentCategory = 0;
  private headers: HTMLElement[] = [];
  private container: HTMLElement;
  private emojis: HTMLElement;
  private categoryButtons: CategoryButtons;

  private isAnimating = false;

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
      this.headerOffsets = Array.prototype.map.call(this.headers, header => header.offsetTop) as number[];
    });

    this.emojis.addEventListener('scroll', this.highlightCategory);
    this.events.on(CATEGORY_CLICKED, this.selectCategory);

    this.container.appendChild(this.emojis);
    return this.container;
  }

  private addCategory = (category: string) => {
    const name = createElement('h2', 'emoji-picker__category-name');
    name.innerHTML = this.i18n.categories[category] || defaultI18n.categories[category];
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
  }

  selectCategory = (category: string) => {
    const headerIndex = categories.indexOf(category);
    const currentPosition = this.emojis.scrollTop;
    const targetPosition = this.headerOffsets[headerIndex];
    const delta = targetPosition - currentPosition;

    const step = delta / SCROLL_ANIMATION_STEPS;

    const stepAnimate = () => {
      if (this.emojis.scrollTop !== targetPosition) {
        if (Math.abs(this.emojis.scrollTop - targetPosition) < Math.abs(step)) {
          this.emojis.scrollTop = targetPosition;
          this.isAnimating = false;
        } else {
          this.emojis.scrollTop += step;
          setTimeout(() => requestAnimationFrame(stepAnimate), SCROLL_ANIMATION_INTERVAL);
        }
      } else {
        this.isAnimating = false;
      }
    }

    this.categoryButtons.setActiveButton(headerIndex);
    this.isAnimating = true;
    requestAnimationFrame(stepAnimate);
  }
  
  highlightCategory = () => {
    if (!this.isAnimating) {
      let closestHeaderIndex = this.headerOffsets.findIndex(offset => offset > this.emojis.scrollTop);

      if (closestHeaderIndex === 0) {
        closestHeaderIndex = 1;
      } else if (closestHeaderIndex < 0) {
        closestHeaderIndex = this.headerOffsets.length;
      }

      this.currentCategory = closestHeaderIndex - 1;
      this.categoryButtons.setActiveButton(this.currentCategory);
    }
  }
}
