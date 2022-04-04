import { EmojiRecord } from './types';

const matcher = window.matchMedia?.('(prefers-reduced-motion: reduce)');

export function getEmojiForEvent(event: Event, emojis: EmojiRecord[]): EmojiRecord | null {
  const target = event.target as HTMLElement;
  const emojiElement = target.closest('[data-emoji]') as HTMLElement;
  if (emojiElement) {
    const emoji = emojis.find(e => e.emoji === emojiElement.dataset.emoji);
    if (emoji) {
      return emoji;
    }
  }

  return null;
}

export function prefersReducedMotion() {
  return matcher?.matches ?? false;
}

export function caseInsensitiveIncludes(str: string, search: string) {
  return str.toLowerCase().includes(search.toLowerCase());
}

/**
 * Creates a throttled version of a function.
 * 
 * @param fn The function to throttle
 * @param wait The wait time in milliseconds
 * @returns a throttled version of fn
 */
export function throttle(fn: () => void, wait: number) {
  let timeout: number | null = null;

  return () => {
    if (timeout) {
      return;
    }

    timeout = window.setTimeout(() => {
      fn();
      timeout = null;
    }, wait);
  };
}

/**
 * Creates a debounced version of a function.
 *
 * @param fn the function to debounce
 * @param wait the wait time in milliseconds
 * @returns a debounced version of fn
 */
export function debounce(fn: (...args: any[]) => any, wait: number) {
  let timeout: number | null = null;

  return (...args: any[]): any => {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      fn(...args);
      timeout = null;
    }, wait);
  };
}
