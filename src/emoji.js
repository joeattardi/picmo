import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { save } from './recent';
import { createElement } from './util';

const CLASS_EMOJI = 'emoji-picker__emoji';

export class Emoji {
  constructor(emoji, showVariants, showPreview, events, options) {
    this.emoji = emoji;
    this.showVariants = showVariants;
    this.showPreview = showPreview;
    this.events = events;
    this.options = options;
  }

  render() {
    this.emojiButton = createElement('button', CLASS_EMOJI);
    this.emojiButton.innerHTML = this.emoji.e;
    this.emojiButton.tabIndex = -1;

    this.emojiButton.addEventListener('focus', () => this.onEmojiHover());
    this.emojiButton.addEventListener('blur', () => this.onEmojiLeave());
    this.emojiButton.addEventListener('click', () => this.onEmojiClick());
    this.emojiButton.addEventListener('mouseover', () => this.onEmojiHover());
    this.emojiButton.addEventListener('mouseout', () => this.onEmojiLeave());

    return this.emojiButton;
  }

  onEmojiClick() {
    // TODO move this side effect out of Emoji, make the recent module listen for event
    if (
      (!this.emoji.v || !this.showVariants || !this.options.showVariants) &&
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

  onEmojiHover() {
    if (this.showPreview) {
      this.events.emit(SHOW_PREVIEW, this.emoji);
    }
  }

  onEmojiLeave() {
    if (this.showPreview) {
      this.events.emit(HIDE_PREVIEW);
    }
  }
}
