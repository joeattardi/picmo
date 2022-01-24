import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';

import { EmojiButtonOptions, EmojiRecord, RecentEmoji } from './types';

import { renderTemplate } from './templates';
import template from './templates/emojiContainer.ejs';
import { LazyLoader } from './lazyLoad';

export class EmojiContainer {
  private emojis: Array<EmojiRecord | RecentEmoji>;

  constructor(
    emojis: Array<EmojiRecord | RecentEmoji>,
    private showVariants: boolean,
    private events: Emitter,
    private options: EmojiButtonOptions,
    private lazy = false,
    private lazyLoader: LazyLoader
  ) {
    this.emojis = emojis.filter(
      e =>
        !(e as EmojiRecord).version ||
        parseFloat((e as EmojiRecord).version as string) <= parseFloat(options.emojiVersion as string)
    );
  }

  render(): HTMLElement {
    return renderTemplate(template, {
      emojis: this.emojis.map(emoji =>
        new Emoji(emoji, this.showVariants, true, this.events, this.options, this.lazy, this.lazyLoader).render()
      )
    });
  }
}
