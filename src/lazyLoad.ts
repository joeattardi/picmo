import escape from 'escape-html';
import twemoji from 'twemoji';

import classes from './styles';

import { EmojiButtonOptions } from './types';
import preloadImage from './preload';

import { compileTemplate } from './templates';
import placeholderTemplate from './templates/placeholder.ejs';

const placeholder = compileTemplate(placeholderTemplate);

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

type LazyLoadFactory = () => HTMLElement | Promise<HTMLElement>;

// TODO lazy load custom emojis too
export class LazyLoader {
  private elements: Map<Element, LazyLoadFactory> = new Map();

  lazyLoad(callback: LazyLoadFactory): HTMLElement {
    const element = placeholder();
    this.elements.set(element, callback);
    return element;
  }

  observe(root: HTMLElement): void {
    const observer = new IntersectionObserver(
      entries => {
        entries
          .filter(entry => entry.intersectionRatio > 0)
          .map(entry => entry.target)
          .forEach(element => {
            const factory = this.elements.get(element);
            if (factory) {
              Promise.resolve(factory()).then(img => {
                observer.unobserve(element);
                element.replaceWith(img);
              });
            }
          });
      },
      {
        root
      }
    );

    this.elements.forEach((callback, element) => {
      observer.observe(element);
    });
  }
}
