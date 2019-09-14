import { Emoji } from './emoji';
import { createElement } from './util';

const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';

export class EmojiContainer {
  constructor(emojis, showVariants, events) {
    this.emojis = emojis;
    this.showVariants = showVariants;
    this.events = events;
  }

  render() {
    const emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
    this.emojis.forEach(emoji =>
      emojiContainer.appendChild(
        new Emoji(emoji, this.showVariants, true, this.events).render()
      )
    );

    return emojiContainer;
  }
}
