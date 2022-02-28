import { View } from './view';
import { EmojiCategory } from './emojiCategory';
import { Emoji } from './emoji';
import { ADD_RECENT } from './events';
import { clear } from './recent';
import classes from './emojiCategory.scss';
import template from './templates/recentEmojis.ejs';
export class RecentEmojiCategory extends EmojiCategory {
  uiElements = {
    ...this.uiElements,
    recents: View.byClass(classes.recentEmojis)
  };

  constructor({ category, showVariants, emojis, events, lazyLoader, i18n, renderer, emojiVersion }) {
    super({
      category,
      showVariants,
      emojis,
      events,
      lazyLoader,
      i18n,
      renderer,
      emojiVersion,
      template
    });

    this.events.on(ADD_RECENT, async recent => {
      const existing = this.emojiContainer.el.querySelector(`[data-emoji="${recent.emoji}"]`);
      if (existing) {
        this.emojiContainer.el.removeChild(existing);
      }

      const emojiGrid = this.emojiContainer.el;
      emojiGrid?.insertBefore(
        await new Emoji({
          emoji: recent,
          renderer: this.renderer
        }).render(),
        emojiGrid.firstChild
      );

      this.ui.recents.dataset.empty = 'false';
    });
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
