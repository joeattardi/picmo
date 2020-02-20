import { EmojiRecord } from './types';

export function createElement(tagName: string, className?: string): HTMLElement {
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

export function getEmojiName(emoji: EmojiRecord): string {
  return typeof emoji.n === 'string' ? emoji.n : emoji.n[0];
}
