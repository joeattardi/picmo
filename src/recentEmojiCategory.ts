import { View } from './view';
import { EmojiCategory } from './emojiCategory';
import { Emoji } from './emoji';
import { clear } from './recent';
import classes from './emojiCategory.scss';
import template from './templates/recentEmojis.ejs';
export class RecentEmojiCategory extends EmojiCategory {
  constructor({ category, showVariants, emojis, lazyLoader, emojiVersion }) {
    super({
      category,
      showVariants,
      emojis,
      lazyLoader,
      emojiVersion,
      template
    });
  }

  initialize() {
    super.initialize();

    this.uiElements = {
      ...this.uiElements,
      recents: View.byClass(classes.recentEmojis)
    };

    this.appEvents = {
      'recent:add': this.addRecent
    };
  }

  async addRecent(recent: any) {
    const existing = this.emojiContainer.el.querySelector(`[data-emoji="${recent.emoji}"]`);
    if (existing) {
      this.emojiContainer.el.removeChild(existing);
    }

    const emojiGrid = this.emojiContainer.el;
    emojiGrid?.insertBefore(
      await this.viewFactory.create(Emoji, { emoji: recent, }).render(),
      emojiGrid.firstChild
    );

    this.ui.recents.dataset.empty = 'false';
  }

  async render(): Promise<HTMLElement> {
    const container = await super.render();

    const clearButton = container.querySelector('button');
    clearButton?.addEventListener('click', () => {
      clear();
      this.emojiContainer.el.replaceChildren();
      this.ui.recents.dataset.empty = 'true';
    });

    return container;
  }
}
