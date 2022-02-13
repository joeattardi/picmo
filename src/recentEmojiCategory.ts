import { EmojiCategory } from './emojiCategory';
import { Emoji } from './emoji';
import { ADD_RECENT } from './events';
import { clear } from './recent';
import classes from './styles';
import template from './templates/recentEmojis.ejs';
import { queryByClass } from './util';

export class RecentEmojiCategory extends EmojiCategory {
  private emojiContainer: HTMLElement;

  initialize(): void {
    this.template = template;

    this.events.on(ADD_RECENT, async recent => {
      const existing = this.emojiContainer.querySelector(`[data-emoji="${recent.emoji}"]`);
      if (existing) {
        this.emojiContainer.removeChild(existing);
      }

      const emojiGrid = this.emojiContainer.firstElementChild;
      emojiGrid.insertBefore(
        await new Emoji(recent, this.showVariants, true, this.events, this.options).render(),
        emojiGrid.firstChild
      );

      this.emojiContainer.dataset.empty = 'false';
    });
  }

  async render(): HTMLElement {
    const container = await super.render();
    this.emojiContainer = queryByClass(this.container, classes.recentEmojis);

    const clearButton = container.querySelector('button');
    clearButton?.addEventListener('click', () => {
      clear();
      this.emojiContainer.replaceChildren();
      this.emojiContainer.dataset.empty = 'true';
    });

    return container;
  }
}
