import { EmojiRecord, RecentEmoji } from './types';

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

export function getEmojiName(emoji: EmojiRecord | RecentEmoji): string {
  return emoji.name;
}

export function formatEmojiName(name: string): string {
  const words = name.split(/[-_]/);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);

  return words.join(' ');
}
