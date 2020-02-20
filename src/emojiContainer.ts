import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';
import { createElement } from './util';

import { EmojiButtonOptions, EmojiRecord, RecentEmoji } from './types';

const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';

export class EmojiContainer {
  private emojis: Array<EmojiRecord | RecentEmoji>;

  constructor(
    emojis: Array<EmojiRecord | RecentEmoji>,
    private showVariants: boolean,
    private events: Emitter,
    private options: EmojiButtonOptions
  ) {
    this.emojis = emojis.filter(
      e =>
        !(e as EmojiRecord).ver ||
        parseFloat((e as EmojiRecord).ver) <=
          parseFloat(options.emojiVersion as string)
    );
  }

  render(): HTMLElement {
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
