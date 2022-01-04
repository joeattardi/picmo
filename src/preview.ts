import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import escape from 'escape-html';
import twemoji from 'twemoji';

import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement } from './util';
import { EmojiRecord, EmojiButtonOptions } from './types';

export class EmojiPreview {
  private emoji: HTMLElement;
  private name: HTMLElement;

  constructor(private events: Emitter, private options: EmojiButtonOptions) {}

  render(): HTMLElement {
    const preview = createElement('div', classes.preview);

    this.emoji = createElement('div', classes.previewEmoji);
    preview.appendChild(this.emoji);

    this.name = createElement('div', classes.previewName);
    preview.appendChild(this.name);

    this.events.on(SHOW_PREVIEW, (emoji: EmojiRecord) => this.showPreview(emoji));
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return preview;
  }

  showPreview(emoji: EmojiRecord): void {
    let content = emoji.emoji;

    if (emoji.custom) {
      content = `<img class="${classes.customEmoji}" src="${escape(emoji.emoji)}">`;
    } else if (this.options.style === 'twemoji') {
      content = twemoji.parse(emoji.emoji, { ...this.options.twemojiOptions, className: classes.twemoji });
    }

    this.emoji.innerHTML = content;
    this.name.innerHTML = escape(emoji.name);
  }

  hidePreview(): void {
    this.emoji.innerHTML = '';
    this.name.innerHTML = '';
  }
}
