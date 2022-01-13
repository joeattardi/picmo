import { TinyEmitter as Emitter } from 'tiny-emitter';
import twemoji from 'twemoji';

import classes from './styles';

import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { image } from './icons';
import { save } from './recent';

import { EmojiButtonOptions, EmojiRecord } from './types';

import { compileTemplate, toElement } from './templates';
import emojiTemplate from './templates/emoji.ejs';
import customEmojiTemplate from './templates/customEmojiContent.ejs';

const emojiCompiled = compileTemplate(emojiTemplate);
const customCompiled = compileTemplate(customEmojiTemplate);

export class Emoji {
  private emojiButton: HTMLElement;

  constructor(
    private emoji: EmojiRecord,
    private showVariants: boolean,
    private showPreview: boolean,
    private events: Emitter,
    private options: EmojiButtonOptions,
    private lazy = false
  ) {}

  render(): HTMLElement {
    this.emojiButton = emojiCompiled({ emoji: this.emoji });

    let content: Text | HTMLElement;
    if (this.lazy || this.options.style === 'twemoji') {
      // TODO fix lazy loading
      content = toElement(image);
    } else if (this.emoji.custom) {
      // TODO make sure XSS fix still works without escaping
      content = customCompiled({ emoji: this.emoji.emoji });
    } else {
      content = document.createTextNode(this.emoji.emoji);
    }

    this.emojiButton.appendChild(content);

    this.emojiButton.addEventListener('focus', () => this.onEmojiHover());
    this.emojiButton.addEventListener('blur', () => this.onEmojiLeave());
    this.emojiButton.addEventListener('click', () => this.onEmojiClick());
    this.emojiButton.addEventListener('mouseover', () => this.onEmojiHover());
    this.emojiButton.addEventListener('mouseout', () => this.onEmojiLeave());

    if (this.options.style === 'twemoji' || this.lazy) {
      this.emojiButton.style.opacity = '0.1';
    }

    return this.emojiButton;
  }

  onEmojiClick(): void {
    // TODO move this side effect out of Emoji, make the recent module listen for event
    if (
      (!(this.emoji as EmojiRecord).variations || !this.showVariants || !this.options.showVariants) &&
      this.options.showRecents
    ) {
      save(this.emoji, this.options);
    }

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
