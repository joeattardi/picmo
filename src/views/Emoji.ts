import { compileTemplate } from '../templates';
import emojiTemplate from '../templates/emoji.ejs';
import { LazyLoader } from '../LazyLoader';

import { View } from './view';

import { EmojiRecord } from '../types';

const emojiCompiled = compileTemplate(emojiTemplate);

import classes from './Emoji.scss';

type EmojiOptions = {
  emoji: EmojiRecord
  lazyLoader?: LazyLoader;
};

export class Emoji extends View {
  private emoji: EmojiRecord
  private lazyLoader?: LazyLoader;

  constructor({ emoji, lazyLoader }: EmojiOptions) {
    super({ template: emojiCompiled, classes });

    this.emoji = emoji;
    this.lazyLoader = lazyLoader;
  }

  async render(): Promise<HTMLElement> {
    return super.render({
      emoji: this.emoji,
      emojiContent: await this.renderer.doRender(this.emoji, this.lazyLoader)
    });
  }
}
