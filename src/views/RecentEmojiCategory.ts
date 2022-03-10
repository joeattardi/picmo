import { Emoji } from 'emojibase';
import { View } from './view';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { EmojiContainer } from './EmojiContainer';
import { Emoji as EmojiView } from './Emoji';
import { Category } from '../types';
import { LazyLoader } from '../LazyLoader';

import classes from './EmojiCategory.scss';
import template from 'templates/recentEmojis.ejs';
import { getRecents, clear } from '../recents';

type RecentEmojiCategoryOptions = {
  category: Category;
  lazyLoader?: LazyLoader;
};
export class RecentEmojiCategory extends BaseEmojiCategory {
  constructor({ category, lazyLoader }: RecentEmojiCategoryOptions) {
    super({ category, showVariants: false, lazyLoader, template });
  }

  initialize() {
    super.initialize();

    this.uiElements = {
      ...this.uiElements,
      recents: View.byClass(classes.recentEmojis),
      clearButton: 'button'
    };

    this.bindAppEvents({
      'recent:add': this.addRecent
    });

    this.uiEvents = [
      View.childEvent('clearButton', 'click', this.clearRecents)
    ]
  }

  clearRecents() {
    clear();
    this.emojiContainer.el.replaceChildren();
    this.ui.recents.dataset.empty = 'true';
  }

  async addRecent(recent: Emoji) {
    const existing = this.emojiContainer.el.querySelector(`[data-emoji="${recent.emoji}"]`);
    if (existing) {
      this.emojiContainer.el.removeChild(existing);
    }

    const emojiGrid = this.emojiContainer.el;
    emojiGrid?.insertBefore(
      await this.viewFactory.create(EmojiView, { emoji: recent, }).render(),
      emojiGrid.firstChild
    );

    this.ui.recents.dataset.empty = 'false';
  }

  async render(): Promise<HTMLElement> {
    const recents = getRecents();

    this.emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis: recents,
      showVariants: false,
      lazyLoader: this.lazyLoader
    });

    return super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: recents.length
    });
  }
}
