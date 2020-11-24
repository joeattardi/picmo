import { EmojiData, EmojiRecord } from './types';

export function createElement(
  tagName: string,
  className?: string
): HTMLElement {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  return element;
}

export function empty(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function formatEmojiName(name: string): string {
  const words = name.split(/[-_]/);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);

  return words.join(' ');
}

export function buildEmojiCategoryData(
  emojiData: EmojiData
): { [key: string]: EmojiRecord[] } {
  const emojiCategories = {};

  emojiData.emoji.forEach(emoji => {
    let categoryList =
      emojiCategories[emojiData.categories[emoji.category || 0]];
    if (!categoryList) {
      categoryList = emojiCategories[
        emojiData.categories[emoji.category || 0]
      ] = [];
    }

    categoryList.push(emoji);
  });

  return emojiCategories;
}
