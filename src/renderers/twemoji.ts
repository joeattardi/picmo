import jss from 'jss';
import twemoji from 'twemoji';

import Renderer from './renderer';
import { EmojiRecord } from '../types';
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

const styles = jss.createStyleSheet(
  {
    twemoji: {
      height: '1em',
      width: '1em',
      margin: '0 0.05em 0 0.1em',
      verticalAlign: '-0.1em'
    }
  },
  { classNamePrefix: 'emoji-button-twemoji-' }
);
styles.attach();

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

  render(emoji: EmojiRecord, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement> {
    const factory = async () => {
      const url = await getTwemojiUrl(emoji.emoji, this.options);
      const img = await preloadImage(url);
      img.className = styles.classes.twemoji;
      return img;
    };

    if (lazyLoader) {
      return lazyLoader.lazyLoad(factory);
    }

    return factory();
  }
}
