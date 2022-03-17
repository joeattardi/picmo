import { Emoji } from 'emojibase';
import { CustomEmoji } from './types';

const matcher = window.matchMedia('(prefers-reduced-motion: reduce)');

export function queryByClass<E extends HTMLElement = HTMLElement>(container: HTMLElement, className: string): E {
  const el = container.querySelector<E>(`.${className}`);

  if (!el) {
    throw new Error(`Could not find element with class ${className}`);
  }

  return el;
}

export function getEmojiForEvent(event: Event, emojis: Emoji[] | CustomEmoji[]): Emoji | CustomEmoji | null {
  const target = event.target as HTMLElement;
  const emojiElement = target.closest('[data-emoji]') as HTMLElement;
  if (emojiElement) {
    const emoji = (emojis as Emoji[]).find(e => e.emoji === emojiElement.dataset.emoji);
    if (emoji) {
      return emoji;
    }
  }

  return null;
}

export function prefersReducedMotion() {
  return matcher.matches;
}

export function caseInsensitiveIncludes(str: string, search: string) {
  return str.toLowerCase().includes(search.toLowerCase());
}
