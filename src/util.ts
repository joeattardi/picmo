// import { EmojiData, EmojiRecord } from './types';

export function formatEmojiName(name: string): string {
  const words = name.split(/[-_]/);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);

  return words.join(' ');
}

export function buildEmojiCategoryData(emojiData: any): { [key: string]: any[] } {
  const emojiCategories = {};

  emojiData.emoji.forEach(emoji => {
    let categoryList = emojiCategories[emojiData.categories[emoji.category || 0]];
    if (!categoryList) {
      categoryList = emojiCategories[emojiData.categories[emoji.category || 0]] = [];
    }

    categoryList.push(emoji);
  });

  return emojiCategories;
}

export function queryByClass<E extends HTMLElement = HTMLElement>(container: HTMLElement, className: string): E {
  const el = container.querySelector<E>(`.${className}`);

  if (!el) {
    throw new Error(`Could not find element with class ${className}`);
  }

  return el;
}

export function queryAllByClass<E extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  className: string
): NodeListOf<E> {
  return container.querySelectorAll<E>(`.${className}`) as NodeListOf<E>;
}
