import { View } from './view';
import classes from './Preview.scss';

import previewTemplate from 'templates/preview.ejs';
import customPreviewTemplate from 'templates/customPreview.ejs';

import { renderTemplate } from '../templates';
export class EmojiPreview extends View {
  constructor() {
    super({ template: previewTemplate, classes });
  }

  initialize() {
    this.uiElements = {
      emoji: View.byClass(classes.previewEmoji), 
      name: View.byClass(classes.previewName)
    };

    this.appEvents = {
      'preview:show': this.showPreview,
      'preview:hide': this.hidePreview
    }
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
