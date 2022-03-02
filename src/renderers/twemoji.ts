import twemoji from 'twemoji';

import classes from './twemoji.scss';

import { Renderer } from './renderer';
import { LazyLoader } from '../lazyLoad';
import preloadImage from '../preload';

type TwemojiCallbackOptions = {
  base: string;
  size: string;
  ext: string;
};

const DEFAULT_OPTIONS: Partial<twemoji.ParseObject> = {
  ext: '.svg',
  folder: 'svg'
};

// TODO handle invalid emoji, reject promise?
// TODO rename emoji.emoji property, confusing?
function getTwemojiUrl(emoji: string, options: Partial<twemoji.ParseObject>): Promise<string> {
  return new Promise(resolve => {
    twemoji.parse(emoji, {
      ...options,
      callback: (icon, options) => {
        const { base, size, ext } = options as TwemojiCallbackOptions;
        const url = `${base}${size}/${icon}${ext}`;
        resolve(url);
        return url;
      }
    });
  });
}

/**
 * Renders emojis using Twemoji images.
 */
export default class TwemojiRenderer extends Renderer {
  constructor(private options = DEFAULT_OPTIONS) {
    super();
  }

  render(emoji: any, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement> {
    const factory = async () => {
      const url = await getTwemojiUrl(emoji.emoji, this.options);
      const img = await preloadImage(url);
      img.className = classes.twemoji;
      return img;
    };

    if (lazyLoader) {
      return lazyLoader.lazyLoad(factory);
    }

    return factory();
  }

  async emit({ emoji, name }: any): Promise<any> {
    const url = await getTwemojiUrl(emoji, this.options);
    return { url, emoji, name };
  }
}
