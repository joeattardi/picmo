import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './preview.module.css';

import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { queryByClass } from './util';

import previewTemplate from './templates/preview.ejs';
import customPreviewTemplate from './templates/customPreview.ejs';

import { renderTemplate } from './templates';
import Renderer from './renderers/renderer';

type EmojiPreviewOptions = {
  events: Emitter;
  renderer: Renderer;
};
export class EmojiPreview {
  private emoji: HTMLElement;
  private name: HTMLElement;
  private events: Emitter;
  private renderer: Renderer;

  constructor({ events, renderer }: EmojiPreviewOptions) {
    this.events = events;
    this.renderer = renderer;
  }

  render(): HTMLElement {
    const preview = renderTemplate(previewTemplate, { classes });

    this.emoji = queryByClass(preview, classes.previewEmoji);
    this.name = queryByClass(preview, classes.previewName);

    this.events.on(SHOW_PREVIEW, emoji => this.showPreview(emoji));
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return preview;
  }

  private async getContent(emoji): Promise<HTMLElement> {
    // TODO lazy load this too?
    if (emoji.custom) {
      return renderTemplate(customPreviewTemplate, {
        emoji: emoji.emoji
      });
    }

    // TODO cache preview images to prevent refetching
    return this.renderer.render(emoji);
  }

  async showPreview(emoji): Promise<void> {
    const content = await this.getContent(emoji);

    this.emoji.replaceChildren(content);
    this.name.textContent = emoji.name;
  }

  hidePreview(): void {
    this.emoji.replaceChildren();
    this.name.replaceChildren();
  }
}
