import twemoji from 'twemoji';

import { EmojiRecord, EmojiSelection } from '../types';
import { Renderer } from './renderer';
import { Image } from '../views/Image';
import { LazyLoader } from '../LazyLoader';

import classes from './twemoji.scss';

type TwemojiCallbackOptions = {
  base: string;
  size: string;
  ext: string;
};

type TwemojiOptions = {
  ext: string;
  folder: string;
}

const DEFAULT_OPTIONS: TwemojiOptions = {
  ext: '.svg',
  folder: 'svg'
};

// TODO handle invalid emoji, reject promise?
// TODO rename emoji.emoji property, confusing?
function getTwemojiUrl(emoji: string, options: TwemojiOptions): Promise<string> {
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

  render(emoji: EmojiRecord, lazyLoader?: LazyLoader, classNames?: string): HTMLElement {
    const img = new Image({ classNames: classNames || classes.twemoji });
    img.renderSync();
    const factory = async () => {
      const url = await getTwemojiUrl(emoji.emoji, this.options);
      img.load(url);
    };

    if (lazyLoader) {
      return lazyLoader.lazyLoad(img, factory);
    }

    factory();
    return img.el;
  }

  async emit({ emoji, label }: EmojiRecord): Promise<EmojiSelection> {
    const url = await getTwemojiUrl(emoji, this.options);
    return { url, emoji, label };
  }
}
