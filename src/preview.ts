import { TinyEmitter as Emitter } from 'tiny-emitter';

import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement, getEmojiName, formatEmojiName } from './util';
import { EmojiRecord } from './types';

const CLASS_PREVIEW = 'emoji-picker__preview';
const CLASS_PREVIEW_EMOJI = 'emoji-picker__preview-emoji';
const CLASS_PREVIEW_NAME = 'emoji-picker__preview-name';

export class EmojiPreview {
  private emoji: HTMLElement;
  private name: HTMLElement;

  constructor(private events: Emitter) {}

  render(): HTMLElement {
    const preview = createElement('div', CLASS_PREVIEW);

    this.emoji = createElement('div', CLASS_PREVIEW_EMOJI);
    preview.appendChild(this.emoji);

    this.name = createElement('div', CLASS_PREVIEW_NAME);
    preview.appendChild(this.name);

    this.events.on(SHOW_PREVIEW, (emoji: EmojiRecord) =>
      this.showPreview(emoji)
    );
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return preview;
  }

  showPreview(emoji: EmojiRecord): void {
    this.emoji.innerHTML = emoji.e;
    this.name.innerHTML = formatEmojiName(getEmojiName(emoji));
  }

  hidePreview(): void {
    this.emoji.innerHTML = '';
    this.name.innerHTML = '';
  }
}
