import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { queryByClass } from './util';
import { EmojiRecord, EmojiButtonOptions } from './types';

import previewTemplate from './templates/preview.ejs';
import customPreviewTemplate from './templates/customPreview.ejs';

import { renderTemplate } from './templates';

export class EmojiPreview {
  private emoji: HTMLElement;
  private name: HTMLElement;

  constructor(private events: Emitter, private options: EmojiButtonOptions) {}

  render(): HTMLElement {
    const preview = renderTemplate(previewTemplate);

    this.emoji = queryByClass(preview, classes.previewEmoji);
    this.name = queryByClass(preview, classes.previewName);

    this.events.on(SHOW_PREVIEW, (emoji: EmojiRecord) => this.showPreview(emoji));
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return preview;
  }

  private async getContent(emoji: EmojiRecord): Promise<HTMLElement> {
    // TODO lazy load this too?
    if (emoji.custom) {
      return renderTemplate(customPreviewTemplate, {
        emoji: emoji.emoji
      });
    }

    // TODO cache preview images to prevent refetching
    return this.options.renderer.render(emoji);
  }

  async showPreview(emoji: EmojiRecord): Promise<void> {
    const content = await this.getContent(emoji);

    this.emoji.replaceChildren(content);
    this.name.textContent = emoji.name;
  }

  hidePreview(): void {
    this.emoji.replaceChildren();
    this.name.replaceChildren();
  }
}
