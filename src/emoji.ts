import { TinyEmitter as Emitter } from 'tiny-emitter';

import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { save } from './recent';
import { createElement } from './util';

import { EmojiButtonOptions, EmojiRecord } from './types';

const CLASS_EMOJI = 'emoji-picker__emoji';

export class Emoji {
  private emojiButton: HTMLElement;

  constructor(
    private emoji: EmojiRecord,
    private showVariants: boolean,
    private showPreview: boolean,
    private events: Emitter,
    private options: EmojiButtonOptions
  ) {}

  render(): HTMLElement {
    this.emojiButton = createElement('button', CLASS_EMOJI);
    this.emojiButton.innerHTML = this.emoji.emoji;
    this.emojiButton.tabIndex = -1;

    this.emojiButton.addEventListener('focus', () => this.onEmojiHover());
    this.emojiButton.addEventListener('blur', () => this.onEmojiLeave());
    this.emojiButton.addEventListener('click', () => this.onEmojiClick());
    this.emojiButton.addEventListener('mouseover', () => this.onEmojiHover());
    this.emojiButton.addEventListener('mouseout', () => this.onEmojiLeave());

    return this.emojiButton;
  }

  onEmojiClick(): void {
    // TODO move this side effect out of Emoji, make the recent module listen for event
    if (
      (!(this.emoji as EmojiRecord).variations ||
        !this.showVariants ||
        !this.options.showVariants) &&
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
