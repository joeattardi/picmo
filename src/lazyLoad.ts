import escape from 'escape-html';
import twemoji from 'twemoji';

import classes from './styles';

import { EmojiButtonOptions } from './types';
import preloadImage from './preload';

type TwemojiCallbackOptions = {
  base: string;
  size: string;
  ext: string;
};

export async function lazyLoadEmoji(element: HTMLElement, options: EmojiButtonOptions): Promise<void> {
  if (!element.dataset.loaded) {
    if (element.dataset.custom) {
      await lazyLoadCustomEmoji(element);
    } else if (options.style === 'twemoji') {
      await lazyLoadTwemoji(element, options);
    }

    element.dataset.loaded = 'true';
    element.style.opacity = '1';
  }
}

function getTwemojiUrl(emoji: string, options: EmojiButtonOptions): Promise<string> {
  return new Promise(resolve => {
    twemoji.parse(emoji, {
      ...options.twemojiOptions,
      callback: (icon, options) => {
        const { base, size, ext } = options as TwemojiCallbackOptions;
        const imageUrl = `${base}${size}/${icon}${ext}`;
        resolve(imageUrl);

        return imageUrl;
      }
    });
  });
}

async function lazyLoadCustomEmoji(element: HTMLElement): Promise<void> {
  const img = await preloadImage(escape(element.dataset.emoji));
  img.className = classes.customEmoji;
  element.replaceChildren(img);
}

async function lazyLoadTwemoji(element: HTMLElement, options: EmojiButtonOptions): Promise<void> {
  if (element.dataset.emoji) {
    const url = await getTwemojiUrl(escape(element.dataset.emoji), options);
    const img = await preloadImage(url);
    img.className = classes.twemoji;
    element.replaceChildren(img);
  }
}
