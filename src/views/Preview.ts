import { View } from './view';
import { EmojiRecord } from '../types';
import { compileTemplate } from '../templates';

import previewTemplate from '../templates/preview.ejs';
import classes from './Preview.scss';

const renderTag = compileTemplate('<li class="<%= classes.tag %>"><%= tag %></li>');

export class EmojiPreview extends View {
  constructor() {
    super({ template: previewTemplate, classes });
  }

  initialize() {
    this.uiElements = {
      emoji: View.byClass(classes.previewEmoji), 
      name: View.byClass(classes.previewName),
      tagList: View.byClass(classes.tagList)
    };

    this.appEvents = {
      'preview:show': this.showPreview,
      'preview:hide': this.showPreview
    };

    super.initialize();
  }

  private async getContent(emoji: EmojiRecord): Promise<HTMLElement> {
    // TODO lazy load this too?

    // TODO cache preview images to prevent refetching
    return this.renderer.doRender(emoji);
  }

  async showPreview(emoji: EmojiRecord) {
    if (emoji) {
      const content = await this.getContent(emoji);
      this.ui.emoji.replaceChildren(content);
      this.ui.name.textContent = emoji.label;
      if (emoji.tags) {
        this.ui.tagList.style.display = 'flex';
        const tags = await Promise.all(emoji.tags.map(tag => renderTag({ tag, classes })));
        this.ui.tagList.replaceChildren(...tags);
      }
    } else {
      this.ui.emoji.replaceChildren();
      this.ui.name.textContent = '';
      this.ui.tagList.replaceChildren();
    }
  }
}
