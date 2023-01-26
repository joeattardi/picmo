import { View } from './view';
import { EmojiRecord } from '../types';

import { Template } from '../Template';
import { getPrefixedClasses, empty, replaceChildren } from '../util';

const classes = getPrefixedClasses(
  'preview',
  'previewEmoji',
  'previewName',
  'tagList',
  'tag'
);

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

  private showPreview(emoji: EmojiRecord, content: HTMLElement) {
    replaceChildren(this.ui.emoji, content);
    this.ui.name.textContent = emoji.label;
    if (emoji.tags) {
      this.ui.tagList.style.display = 'flex';
      const tags = emoji.tags.map(tag => tagTemplate.renderSync({ tag, classes }) as HTMLElement);
      replaceChildren(this.ui.tagList, ...tags);
    }
  }

  private hidePreview() {
    empty(this.ui.emoji);
    empty(this.ui.name);
    empty(this.ui.tagList);
  }
}
