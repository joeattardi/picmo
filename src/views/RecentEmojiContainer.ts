import { Emoji } from 'emojibase';
import { EmojiContainer } from './EmojiContainer';
import { Emoji as EmojiView } from './Emoji';

export class RecentEmojiContainer extends EmojiContainer {
  constructor({ emojis, preview = true, lazyLoader }) {
    super({ emojis, showVariants: false, preview, lazyLoader });
  }

  async addOrUpdate(emoji: Emoji): Promise<void> {
    // If the emoji already exists, remove it as it is being moved to the front
    const existing = this.el.querySelector(`[data-emoji="${emoji.emoji}"]`);
    if (existing) {
      this.el.removeChild(existing);
      this.emojis = this.emojis.filter(e => e !== emoji);
    }
    
    // Add the new emoji to the beginning of the list
    const newView = this.viewFactory.create(EmojiView, { emoji });
    this.el.insertBefore(await newView.render(), this.el.firstChild);
    this.emojis = [
      emoji,
      ...this.emojis.filter(e => e !== emoji)
    ];

    // Prune the list to the maximum length
    if (this.emojis.length > this.options.maxRecents) {
      this.emojis = this.emojis.slice(0, this.options.maxRecents);
      const excess = this.el.childElementCount - this.options.maxRecents;
      for (let i = 0; i < excess; i++) {
        if (this.el.lastElementChild) {
          this.el.removeChild(this.el.lastElementChild);
        }
      }
    }
  }
}