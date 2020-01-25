import { Emoji } from './emoji';
import { createElement } from './util';

const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';

export class EmojiContainer {
  constructor(emojis, showVariants, events, options) {
    this.emojis = emojis.filter(e => e.ver <= parseFloat(options.emojiVersion));
    this.showVariants = showVariants;
    this.events = events;
    this.options = options;
  }

  render() {
    const emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
    this.emojis.forEach(emoji =>
      emojiContainer.appendChild(
        new Emoji(
          emoji,
          this.showVariants,
          true,
          this.events,
          this.options
        ).render()
      )
    );

    return emojiContainer;
  }
}
