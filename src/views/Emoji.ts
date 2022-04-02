import { compileTemplateSync } from '../templates';
import emojiTemplate from '../templates/emoji.ejs';
import { LazyLoader } from '../LazyLoader';

import { View } from './view';

import { CategoryKey, EmojiRecord } from '../types';

const emojiCompiled = compileTemplateSync(emojiTemplate);

import classes from './Emoji.scss';

type EmojiOptions = {
  emoji: EmojiRecord
  lazyLoader?: LazyLoader;
  category?: CategoryKey;
};

export class Emoji extends View {
  private emoji: EmojiRecord
  private lazyLoader?: LazyLoader;
  private category?: CategoryKey;

  constructor({ emoji, lazyLoader, category }: EmojiOptions) {
    super({ template: emojiCompiled, classes });

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
