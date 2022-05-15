import { EmojiRecord, PickerOptions } from './types';

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

export function shouldAnimate(options: PickerOptions) {
  const matcher = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  return options.animate && !matcher?.matches;
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

export function animate(element: HTMLElement, keyframes: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions, pickerOptions: PickerOptions): Promise<Animation | void> {
  if (shouldAnimate(pickerOptions) && element.animate) {
    return element.animate(keyframes, options).finished;
  }

  return Promise.resolve();
}

/**
 * Takes a rendered HTML string and renders a DOM node from it.
 *
 * @param html the HTML text
 * @returns the generated HTMLElement
 */
 export function toElement<E extends Element = HTMLElement>(html: string): E {
  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content?.firstElementChild as E;
}

export async function computeHash(obj: any) {
  const arr = new TextEncoder().encode(obj);
  const hashBuffer = await crypto.subtle.digest('SHA-256', arr);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}