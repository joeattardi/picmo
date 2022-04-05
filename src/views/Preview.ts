import { View } from './view';
import { EmojiRecord } from '../types';
import { compileTemplateSync } from '../templates';

import previewTemplate from '../templates/preview.ejs';
import classes from './Preview.scss';

const renderTag = compileTemplateSync('<li class="<%= classes.tag %>"><%= tag %></li>');

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
      'preview:hide': this.hidePreview
    };

    super.initialize();
  }

  private showPreview(emoji: EmojiRecord, content: Element) {
    this.ui.emoji.replaceChildren(content);
    this.ui.name.textContent = emoji.label;
    if (emoji.tags) {
      this.ui.tagList.style.display = 'flex';
      const tags = emoji.tags.map(tag => renderTag({ tag, classes }) as HTMLElement);
      this.ui.tagList.replaceChildren(...tags);
    }
  }

  private hidePreview() {
    this.ui.emoji.replaceChildren();
    this.ui.name.textContent = '';
    this.ui.tagList.replaceChildren();
  }
}
