import twemoji from 'twemoji';

import { EmojiRecord, EmojiSelection } from '../types';
import { Renderer } from './renderer';

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

type TwemojiImageFormat = 'svg' | 'png';

const formatOptions: Record<TwemojiImageFormat, TwemojiOptions> = {
  png: {
    ext: '.png',
    folder: '72x72'
  },
  svg: {
    ext: '.svg',
    folder: 'svg'
  }
}

function getTwemojiUrl(record: EmojiRecord, options: TwemojiOptions): Promise<string> {
  return new Promise(resolve => {
    twemoji.parse(record.emoji, {
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
export class TwemojiRenderer extends Renderer {
  private options: TwemojiOptions;

  constructor(format: TwemojiImageFormat = 'svg') {
    super();
    this.options = formatOptions[format];
  }

  render(record: EmojiRecord, classNames = classes.twemoji) {
    return this.renderImage(classNames, () => getTwemojiUrl(record, this.options));
  }

  async emit(record: EmojiRecord): Promise<EmojiSelection> {
    const url = await getTwemojiUrl(record, this.options);
    return { url, hexcode: record.hexcode,emoji: record.emoji, label: record.label };
  }
}
