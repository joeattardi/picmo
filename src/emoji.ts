import { TinyEmitter as Emitter } from 'tiny-emitter';
import twemoji from 'twemoji';

import classes from './styles';

import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { save } from './recent';

import { EmojiButtonOptions, EmojiRecord } from './types';

import { renderTemplate, compileTemplate, toElement } from './templates';
import emojiTemplate from './templates/emoji.ejs';
import customEmojiTemplate from './templates/customEmojiContent.ejs';
import placeholderTemplate from './templates/placeholder.ejs';
import { LazyLoader } from './lazyLoad';

const emojiCompiled = compileTemplate(emojiTemplate);
const customCompiled = compileTemplate(customEmojiTemplate);

const placeholder = renderTemplate(placeholderTemplate);

export class Emoji {
  private emojiButton: HTMLElement;

  constructor(
    private emoji: EmojiRecord,
    private showVariants: boolean,
    private showPreview: boolean,
    private events: Emitter,
    private options: EmojiButtonOptions,
    private lazyLoader?: LazyLoader
  ) {}

  async render(): Promise<HTMLElement> {
    this.emojiButton = emojiCompiled({ emoji: this.emoji });

    let content: Text | HTMLElement;
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

    content = await this.options.renderer.render(this.emoji, this.lazyLoader);
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
