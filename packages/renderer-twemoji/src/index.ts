import { parse } from 'twemoji-parser';

import { EmojiRecord, EmojiSelection, Renderer } from 'picmo';

import classes from './twemoji.scss';

type TwemojiImageFormat = 'svg' | 'png';

function getTwemojiUrl(record: EmojiRecord, format: TwemojiImageFormat) {
  const [result] = parse(record.emoji, { assetType: format });
  return result?.url;
}

/**
 * Renders emojis using Twemoji images.
 */
export class TwemojiRenderer extends Renderer {
  private format: TwemojiImageFormat;

  constructor(format: TwemojiImageFormat = 'svg') {
    super();
    this.format = format;
  }

  render(record: EmojiRecord, classNames = classes.twemoji) {
    return this.renderImage(classNames, () => {
      return getTwemojiUrl(record, this.format);
    });
  }

  emit(record: EmojiRecord): EmojiSelection {
    return { 
      url: getTwemojiUrl(record, this.format), 
      hexcode: record.hexcode,
      emoji: record.emoji, 
      label: record.label 
    };
  }
}
