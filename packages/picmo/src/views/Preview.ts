import { View } from './view';
import { EmojiRecord } from '../types';

import { Template } from '../Template';

import classes from './Preview.scss';

const tagTemplate = new Template(({ classes, tag }) => /* html */`
  <li class="${classes.tag}">${tag}</li>
`);

const template = new Template(({ classes }) => /* html */`
  <div class="${classes.preview}">
    <div class="${classes.previewEmoji}"></div>
    <div class="${classes.previewName}"></div>
    <ul class="${classes.tagList}"></ul>
  </div>
`);

export class EmojiPreview extends View {
  constructor() {
    super({ template, classes });
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
      const tags = emoji.tags.map(tag => tagTemplate.renderSync({ tag, classes }) as HTMLElement);
      this.ui.tagList.replaceChildren(...tags);
    }
  }

  private hidePreview() {
    this.ui.emoji.replaceChildren();
    this.ui.name.textContent = '';
    this.ui.tagList.replaceChildren();
  }
}
