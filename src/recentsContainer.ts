import { ADD_RECENT } from './events';
import { EmojiContainer } from './emojiContainer';
import { Emoji } from './emoji';

import recentsTemplate from './templates/recentEmojiContainer.ejs';

export class RecentsContainer extends EmojiContainer {
  initialize(): void {
    this.template = recentsTemplate;
    this.events.on(ADD_RECENT, async recent => {
      const existing = this.container.querySelector(`[data-emoji="${recent.emoji}"]`);
      if (existing) {
        this.container.removeChild(existing);
      }

      this.container.insertBefore(
        await new Emoji(recent, this.showVariants, true, this.events, this.options).render(),
        this.container.firstChild
      );
    });
  }
}
