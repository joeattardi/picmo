import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';
import { i18n as defaultI18n } from './i18n';

import { CategoryButtons } from './categoryButtons';
import { EmojiContainer } from './emojiContainer';

import {
  I18NStrings,
  EmojiButtonOptions,
  EmojiRecord,
  I18NCategory
} from './types';
import { createElement } from './util';

const categories = emojiData.categories;

const emojiCategories: { [key: string]: EmojiRecord[] } = {};
emojiData.emoji.forEach(emoji => {
  let categoryList = emojiCategories[categories[emoji.category]];
  if (!categoryList) {
    categoryList = emojiCategories[categories[emoji.category]] = [];
  }

  categoryList.push(emoji);
});

export class EmojiArea {
  headerOffsets: number[];

  currentCategory = 0;

  constructor(
    private events: Emitter,
    private i18n: I18NStrings,
    private options: EmojiButtonOptions
  ) {}

  container: HTMLElement;

  render(): HTMLElement {
    this.container = createElement('div', 'emoji-picker__emoji-area');

    const categoryButtons = new CategoryButtons(this.options);
    this.container.appendChild(categoryButtons.render());

    const headers: HTMLElement[] = [];

    const emojis = createElement('div', 'emoji-picker__emojis');
    Object.keys(emojiCategories).forEach((category: string) => {
      const name = createElement('h2', 'emoji-picker__category-name');
      name.innerHTML = this.i18n.categories[category] || defaultI18n.categories[category];
      emojis.appendChild(name);
      headers.push(name);

      emojis.appendChild(
        new EmojiContainer(
          emojiCategories[category],
          true,
          this.events,
          this.options
        ).render()
      );
    });

    this.container.appendChild(emojis);

    requestAnimationFrame(() => {
      this.headerOffsets = Array.prototype.map.call(headers, header => header.offsetTop) as number[];
    });

    emojis.addEventListener('scroll', () => {
      let closestHeaderIndex = this.headerOffsets.findIndex(offset => offset > emojis.scrollTop);

      if (closestHeaderIndex === 0) {
        closestHeaderIndex = 1;
      } else if (closestHeaderIndex < 0) {
        closestHeaderIndex = this.headerOffsets.length;
      }

      this.currentCategory = closestHeaderIndex - 1;
      categoryButtons.setActiveButton(this.currentCategory);
    });

    return this.container;
  }
}
