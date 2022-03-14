import { Emoji } from 'emojibase';
import { View } from './view';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { RecentEmojiContainer } from './RecentEmojiContainer';
import { Category } from '../types';
import { LazyLoader } from '../LazyLoader';

import classes from './EmojiCategory.scss';
import template from '../templates/recentEmojis.ejs';
import { getRecents, clear } from '../recents';

type RecentEmojiCategoryOptions = {
  category: Category;
  lazyLoader?: LazyLoader;
};
export class RecentEmojiCategory extends BaseEmojiCategory {
  emojiContainer: RecentEmojiContainer;

  constructor({ category, lazyLoader }: RecentEmojiCategoryOptions) {
    super({ category, showVariants: false, lazyLoader, template });
  }

  initialize() {
    this.uiElements = {
      ...this.baseUIElements,
      recents: View.byClass(classes.recentEmojis),
      clearButton: 'button'
    };

    this.appEvents = {
      'recent:add': this.addRecent
    };

    this.uiEvents = [
      View.childEvent('clearButton', 'click', this.clearRecents)
    ]

    super.initialize();
  }

  clearRecents() {
    clear();
    this.emojiContainer.el.replaceChildren();
    this.ui.recents.dataset.empty = 'true';
  }

  async addRecent(recent: Emoji) {
    await this.emojiContainer.addOrUpdate(recent);
    this.ui.recents.dataset.empty = 'false';
  }

  async render(): Promise<HTMLElement> {
    const recents = getRecents();

    this.emojiContainer = this.viewFactory.create(RecentEmojiContainer, {
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
