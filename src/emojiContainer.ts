import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';
import { createElement } from './util';

import { CLASS_EMOJI_CONTAINER } from './classes';

import { EmojiButtonOptions, EmojiRecord, RecentEmoji } from './types';

export class EmojiContainer {
  private emojis: Array<EmojiRecord | RecentEmoji>;

  constructor(
    emojis: Array<EmojiRecord | RecentEmoji>,
    private showVariants: boolean,
    private events: Emitter,
    private options: EmojiButtonOptions,
    private lazy = true
  ) {
    this.emojis = emojis.filter(
      e =>
        !(e as EmojiRecord).version ||
        parseFloat((e as EmojiRecord).version as string) <=
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
          this.options,
          this.lazy
        ).render()
      )
    );

    return emojiContainer;
  }
}
