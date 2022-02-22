import { TinyEmitter as Emitter } from 'tiny-emitter';

import { View } from './view';
import classes from './preview.scss';

import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';

import previewTemplate from './templates/preview.ejs';
import customPreviewTemplate from './templates/customPreview.ejs';

import { renderTemplate } from './templates';
import Renderer from './renderers/renderer';

type EmojiPreviewOptions = {
  events: Emitter;
  renderer: Renderer;
};
export class EmojiPreview extends View {
  private events: Emitter;
  private renderer: Renderer;

  uiElements = [
    View.byClass(classes.previewEmoji, 'emoji'), 
    View.byClass(classes.previewName, 'name')
  ];

  constructor({ events, renderer }: EmojiPreviewOptions) {
    super(previewTemplate, classes);

    this.events = events;
    this.renderer = renderer;
  }

  async render(): Promise<HTMLElement> {
    await super.render();

    this.events.on(SHOW_PREVIEW, emoji => this.showPreview(emoji));
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return this.el;
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

    this.ui.emoji.replaceChildren(content);
    this.ui.name.textContent = emoji.name;
  }

  hidePreview(): void {
    this.ui.emoji.replaceChildren();
    this.ui.name.replaceChildren();
  }
}
