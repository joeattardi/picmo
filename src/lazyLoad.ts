import escape from 'escape-html';
import twemoji from 'twemoji';

import { CLASS_CUSTOM_EMOJI } from './classes';
import { EmojiButtonOptions } from './types';

import { createElement } from './util';

export function lazyLoadEmoji(
  element: HTMLElement,
  options: EmojiButtonOptions
): void {
  if (!element.dataset.loaded) {
    if (element.dataset.custom) {
      lazyLoadCustomEmoji(element);
    } else if (options.style === 'twemoji') {
      lazyLoadTwemoji(element, options);
    }

    element.dataset.loaded = 'true';
    element.style.opacity = '1';
  }
}

function lazyLoadCustomEmoji(element: HTMLElement): void {
  const img = createElement('img', CLASS_CUSTOM_EMOJI) as HTMLImageElement;

  if (element.dataset.emoji) {
    img.src = escape(element.dataset.emoji);
    element.innerText = '';
    element.appendChild(img);
  }
}

function lazyLoadTwemoji(
  element: HTMLElement,
  options: EmojiButtonOptions
): void {
  if (element.dataset.emoji) {
    element.innerHTML = twemoji.parse(
      element.dataset.emoji,
      options.twemojiOptions
    );
  }
}
