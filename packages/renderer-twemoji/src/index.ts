import { parse } from 'twemoji-parser';

import { EmojiRecord, EmojiSelection, Renderer, toElement } from 'picmo';

import classes from './twemoji.scss';

import * as spriteSheets from './sprites';

type TwemojiImageFormat = 'svg' | 'png';

/**
 * Given an EmojiRecord, calculate the key of its sprite within the sprite sheet.
 * 
 * @param record the record to render
 * @returns the key of the sprite
 */
function getTwemojiKey(record: EmojiRecord) {
  const [result] = parse(record.emoji);
  const [filename] = result.url.split('/').slice(-1);
  const [key] = filename.split('.');
  return key;
}

/**
 * Given an EmojiRecord, calculate the URL of the associated Twemoji image.
 * 
 * @param record the record to emit
 * @param format the desired format (SVG or PNG)
 * @returns the full URL of the image
 */
function getTwemojiUrl(record: EmojiRecord, format: TwemojiImageFormat) {
  const [result] = parse(record.emoji, { assetType: format });
  return result?.url;
}

/**
 * ID of the container element which includes all of the SVG sprites. This is to make sure 
 * that the sprites are only included once in situations where there may be multiple active pickers
 * (in which case, they will share the same sprite sheets).
 */
const SVG_SPRITES_ID = 'picmo-twemoji-sprites';

/**
 * Renders a Twemoji SVG, referencing a symbol with a given ID (the svgKey)
 * @param svgKey the key of the sprite to render
 * @returns an <svg> element that references the specified sprite
 */
function renderSvg(svgKey) {
  return toElement(/* html */`
    <svg class="${classes.twemoji}">
      <use xlink:href="#${svgKey}" />
    </svg>
  `);
}

/**
 * Renders emojis using Twemoji images.
 * 
 * Emojis are always rendered within the picker as SVGs, using the sprite sheets.
 * By default, the emitted URLs will also be for SVG format, a format of 'png' can be
 * given to get the PNG URLs instead.
 */
export class TwemojiRenderer extends Renderer {
  private format: TwemojiImageFormat;

  constructor(format: TwemojiImageFormat = 'svg') {
    super();
    this.format = format;
    this.#insertSvg();
  }

  /**
   * Inserts the SVG sprite sheets into the document if they do not already exist.
   * This should only happen once, even when there are multiple pickers.
   */
  #insertSvg() {
    if (!document.getElementById(SVG_SPRITES_ID)) {
      const svgContainer = document.createElement('div');
      svgContainer.id = SVG_SPRITES_ID;

      Object.values(spriteSheets).forEach(spriteContent => {
        svgContainer.appendChild(toElement(spriteContent));
      });

      document.body.appendChild(svgContainer);
    }
  }

  render(record: EmojiRecord, classNames = classes.twemoji) {
    const svgKey = getTwemojiKey(record);
    if (svgKey) {
      return this.renderElement(renderSvg(svgKey));
    }

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
