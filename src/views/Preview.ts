import { View } from './view';
import { EmojiRecord } from '../types';
import { compileTemplateSync } from '../templates';

import { Image } from './Image';

import previewTemplate from '../templates/preview.ejs';
import classes from './Preview.scss';

const renderTag = compileTemplateSync('<li class="<%= classes.tag %>"><%= tag %></li>');

export class EmojiPreview extends View {
  private emoji?: EmojiRecord;

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
      'preview:show': this.handlePreview,
      'preview:hide': this.handlePreview
    };

    super.initialize();
  }

  private getContent(emoji: EmojiRecord): HTMLElement {
    // TODO lazy load this too?

    // TODO cache preview images to prevent refetching
    const element = this.renderer.doRender(emoji);

    return element;
  }

  // TODO lazy load to prevent delay in showing content
  handlePreview(emoji?: EmojiRecord) {
    this.emoji = emoji;
    if (emoji) {
      const content = this.getContent(emoji);
      if (this.emoji === emoji) {
        this.showPreview(emoji, content);
      }
    } else {
      this.hidePreview();
    }
  }

  private showPreview(emoji: EmojiRecord, content: HTMLElement) {
    this.ui.emoji.replaceChildren(content);
    this.ui.name.textContent = emoji.label;
    if (emoji.tags) {
      this.ui.tagList.style.display = 'flex';
      const tags = emoji.tags.map(tag => renderTag({ tag, classes }) as HTMLElement);
      this.ui.tagList.replaceChildren(...tags);
    }
  }

  private hidePreview() {
    // this.ui.emoji.replaceChildren();
    // this.ui.name.textContent = '';
    // this.ui.tagList.replaceChildren();
  }
}
