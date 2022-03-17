import { Emoji as EmojiType } from 'emojibase';
import { compileTemplate } from '../templates';
import emojiTemplate from '../templates/emoji.ejs';
import { LazyLoader } from '../LazyLoader';

import { View } from './view';

import { CustomEmoji } from '../types';

const emojiCompiled = compileTemplate(emojiTemplate);

import classes from './Emoji.scss';

type EmojiOptions = {
  emoji: EmojiType | CustomEmoji;
  lazyLoader?: LazyLoader;
};

export class Emoji extends View {
  private emoji: EmojiType | CustomEmoji;
  private lazyLoader?: LazyLoader;

  constructor({ emoji, lazyLoader }: EmojiOptions) {
    super({ template: emojiCompiled, classes });

    this.emoji = emoji;
    this.lazyLoader = lazyLoader;
  }

  async render(): Promise<HTMLElement> {
    const emojiContent = await this.renderer.doRender(this.emoji, this.lazyLoader);
    return super.render({ 
      emoji: this.emoji,
      emojiContent
    });

    // TODO fix custom emojis
    // let content: Text | HTMLElement;
    // if (this.lazy || this.options.style === 'twemoji') {
    //   // TODO fix lazy loading
    //   content = placeholder.cloneNode() as HTMLElement;
    //   // content.classList.add(classes.imagePlaceholder);
    // } else if (this.emoji.custom) {
    //   // TODO make sure XSS fix still works without escaping
    //   content = customCompiled({ classes, emoji: this.emoji.emoji });
    // } else {
    //   content = document.createTextNode(this.emoji.emoji);
    // }

    // const content = await this.renderer.render(this.emoji, this.lazyLoader);
    // el.appendChild(content);

    // return el;
  }
}
