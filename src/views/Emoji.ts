import { LazyLoader } from '../LazyLoader';

import { View } from './view';

import { CategoryKey, EmojiRecord } from '../types';
import { Template } from '../Template';

import classes from './Emoji.scss';

type EmojiOptions = {
  emoji: EmojiRecord
  lazyLoader?: LazyLoader;
  category?: CategoryKey;
};

const template = new Template(({ classes, emoji }) => /* html */`
  <button
    class="${classes.emoji}
    title="${emoji.label}
    data-emoji="${emoji.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`);


export class Emoji extends View {
  private emoji: EmojiRecord
  private lazyLoader?: LazyLoader;
  private category?: CategoryKey;

  constructor({ emoji, lazyLoader, category }: EmojiOptions) {
    super({ template, classes });

    this.emoji = emoji;
    this.lazyLoader = lazyLoader;
    this.category = category;
  }

  initialize() {
    this.uiEvents = [
      View.uiEvent('focus', this.handleFocus)
    ];
    
    super.initialize();
  }

  private handleFocus() {
    if (this.category) {
      this.events.emit('focus:change', this.category);
    }
  }

  activateFocus(performFocus?: boolean) {
    this.el.tabIndex = 0;
    if (performFocus) {
      this.el.focus();
    }
  }

  deactivateFocus() {
    this.el.tabIndex = -1;
  }

  renderSync(): HTMLElement {
    return super.renderSync({
      emoji: this.emoji,
      emojiContent: this.renderer.doRender(this.emoji, this.lazyLoader)
    });
  }
}
