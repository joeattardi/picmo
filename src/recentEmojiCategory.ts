import { EmojiCategory } from './emojiCategory';
import { Emoji } from './emoji';
import { ADD_RECENT } from './events';
import { clear } from './recent';
import classes from './emojiCategory.scss';
import { queryByClass } from './util';
import template from './templates/recentEmojis.ejs';

export class RecentEmojiCategory extends EmojiCategory {
  // private emojiContainer: HTMLElement;
  private recentsEl: HTMLElement;

  initialize(): void {
    this.template = template;

    this.events.on(ADD_RECENT, async recent => {
      const existing = this.emojiContainer.container.querySelector(`[data-emoji="${recent.emoji}"]`);
      if (existing) {
        this.emojiContainer.container.removeChild(existing);
      }

      const emojiGrid = this.emojiContainer.container;
      emojiGrid?.insertBefore(
        await new Emoji({
          emoji: recent,
          showVariants: this.showVariants,
          showPreview: true,
          events: this.events,
          renderer: this.renderer
        }).render(),
        emojiGrid.firstChild
      );

      this.recentsEl.dataset.empty = 'false';
    });
  }

  async render(): Promise<HTMLElement> {
    const container = await super.render();
    this.recentsEl = queryByClass(container, classes.recentEmojis);

    // this.emojiContainer = queryByClass(this.container, classes.recentEmojis);

    const clearButton = container.querySelector('button');
    clearButton?.addEventListener('click', () => {
      clear();
      // const recentsEl = this.container.querySelector<HTMLElement>(`.${classes.recentEmojis}`);
      // console.log(recentsEl);
      this.emojiContainer.container.replaceChildren();
      this.recentsEl.dataset.empty = 'true';
    });

    return container;
  }
}
