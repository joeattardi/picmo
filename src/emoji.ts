import { compileTemplate } from './templates';
import emojiTemplate from './templates/emoji.ejs';
import customEmojiTemplate from './templates/customEmojiContent.ejs';
import { LazyLoader } from './lazyLoad';
import { Renderer } from './renderers/renderer';

import { View } from './view';

const emojiCompiled = compileTemplate(emojiTemplate);
const customCompiled = compileTemplate(customEmojiTemplate);

import classes from './emoji.scss';

type EmojiOptions = {
  emoji: any;
  lazyLoader?: LazyLoader;
};
export class Emoji extends View {
  private emoji: any;
  private lazyLoader?: LazyLoader;

  constructor({ emoji, lazyLoader }: EmojiOptions) {
    super(emojiCompiled, classes);

    this.emoji = emoji;
    this.lazyLoader = lazyLoader;
  }

  async render(): Promise<HTMLElement> {
    const emojiContent = await this.renderer.render(this.emoji, this.lazyLoader);
    return super.render({ emoji: this.emoji, emojiContent });

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
