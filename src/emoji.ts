import { TinyEmitter as Emitter } from 'tiny-emitter';

import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';

import { compileTemplate } from './templates';
import emojiTemplate from './templates/emoji.ejs';
import customEmojiTemplate from './templates/customEmojiContent.ejs';
import { LazyLoader } from './lazyLoad';
import Renderer from './renderers/renderer';

import { View } from './view';

const emojiCompiled = compileTemplate(emojiTemplate);
const customCompiled = compileTemplate(customEmojiTemplate);

import classes from './emoji.scss';

type EmojiOptions = {
  emoji: any;
  showVariants: boolean;
  showPreview: boolean;
  events: Emitter;
  lazyLoader?: LazyLoader;
  renderer: Renderer;
};
export class Emoji extends View {
  private emoji: any;
  private showVariants: boolean;
  private showPreview: boolean;
  private events: Emitter;
  private lazyLoader?: LazyLoader;
  private renderer: Renderer;

  constructor({ emoji, showVariants, showPreview, events, lazyLoader, renderer }: EmojiOptions) {
    super();
    this.emoji = emoji;
    this.showVariants = showVariants;
    this.showPreview = showPreview;
    this.events = events;
    this.lazyLoader = lazyLoader;
    this.renderer = renderer;
  }

  async doRender(): Promise<HTMLElement> {
    const el = emojiCompiled({ classes, emoji: this.emoji });

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

    const content = await this.renderer.render(this.emoji, this.lazyLoader);
    el.appendChild(content);

    return el;
  }
}
