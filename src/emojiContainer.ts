import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';

import { EmojiButtonOptions, EmojiRecord, RecentEmoji } from './types';

import { renderTemplate } from './templates';
import template from './templates/emojiContainer.ejs';
import { LazyLoader } from './lazyLoad';

export class EmojiContainer {
  protected container: HTMLElement;
  protected emojis: Array<EmojiRecord | RecentEmoji>;
  protected showVariants: boolean;
  protected events: Emitter;
  protected options: EmojiButtonOptions;
  protected lazy = false;
  protected lazyLoader: LazyLoader;

  constructor(
    emojis: Array<EmojiRecord | RecentEmoji>,
    showVariants: boolean,
    events: Emitter,
    options: EmojiButtonOptions,
    lazyLoader: LazyLoader
  ) {
    this.showVariants = showVariants;
    this.events = events;
    this.options = options;
    this.lazyLoader = lazyLoader;

    this.emojis = emojis.filter(
      e =>
        !(e as EmojiRecord).version ||
        parseFloat((e as EmojiRecord).version as string) <= parseFloat(this.options.emojiVersion as string)
    );

    this.initialize();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize(): void {}

  async render(): Promise<HTMLElement> {
    const emojis = await Promise.all(
      this.emojis.map(emoji =>
        new Emoji(emoji, this.showVariants, true, this.events, this.options, this.lazyLoader).render()
      )
    );

    this.container = renderTemplate(template, { emojis });
    return this.container;
  }
}
