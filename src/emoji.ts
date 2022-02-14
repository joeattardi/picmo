import { TinyEmitter as Emitter } from 'tiny-emitter';

import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';

import { compileTemplate } from './templates';
import emojiTemplate from './templates/emoji.ejs';
import customEmojiTemplate from './templates/customEmojiContent.ejs';
import { LazyLoader } from './lazyLoad';
import Renderer from './renderers/renderer';

const emojiCompiled = compileTemplate(emojiTemplate);
const customCompiled = compileTemplate(customEmojiTemplate);

type EmojiOptions = {
  emoji: any;
  showVariants: boolean;
  showPreview: boolean;
  events: Emitter;
  lazyLoader?: LazyLoader;
  renderer: Renderer;
};
export class Emoji {
  private emojiButton: HTMLElement;

  private emoji: any;
  private showVariants: boolean;
  private showPreview: boolean;
  private events: Emitter;
  private lazyLoader?: LazyLoader;
  private renderer: Renderer;

  constructor({ emoji, showVariants, showPreview, events, lazyLoader, renderer }: EmojiOptions) {
    this.emoji = emoji;
    this.showVariants = showVariants;
    this.showPreview = showPreview;
    this.events = events;
    this.lazyLoader = lazyLoader;
    this.renderer = renderer;
  }

  async render(): Promise<HTMLElement> {
    this.emojiButton = emojiCompiled({ emoji: this.emoji });

    // let content: Text | HTMLElement;
    // if (this.lazy || this.options.style === 'twemoji') {
    //   // TODO fix lazy loading
    //   content = placeholder.cloneNode() as HTMLElement;
    //   // content.classList.add(classes.imagePlaceholder);
    // } else if (this.emoji.custom) {
    //   // TODO make sure XSS fix still works without escaping
    //   content = customCompiled({ emoji: this.emoji.emoji });
    // } else {
    //   content = document.createTextNode(this.emoji.emoji);
    // }

    const content = await this.renderer.render(this.emoji, this.lazyLoader);
    this.emojiButton.appendChild(content);

    this.emojiButton.addEventListener('focus', () => this.onEmojiHover());
    this.emojiButton.addEventListener('blur', () => this.onEmojiLeave());
    this.emojiButton.addEventListener('click', () => this.onEmojiClick());
    this.emojiButton.addEventListener('mouseover', () => this.onEmojiHover());
    this.emojiButton.addEventListener('mouseout', () => this.onEmojiLeave());

    return this.emojiButton;
  }

  onEmojiClick(): void {
    this.events.emit(EMOJI, {
      emoji: this.emoji,
      showVariants: this.showVariants,
      button: this.emojiButton
    });
  }

  onEmojiHover(): void {
    if (this.showPreview) {
      this.events.emit(SHOW_PREVIEW, this.emoji);
    }
  }

  onEmojiLeave(): void {
    if (this.showPreview) {
      this.events.emit(HIDE_PREVIEW);
    }
  }
}
