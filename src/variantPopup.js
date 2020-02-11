import { Emoji } from './emoji';
import { createElement } from './util';

import { HIDE_VARIANT_POPUP } from './events';

import { times } from './icons';

const CLASS_OVERLAY = 'emoji-picker__variant-overlay';
const CLASS_POPUP = 'emoji-picker__variant-popup';
const CLASS_CLOSE_BUTTON = 'emoji-picker__variant-popup-close-button';

export class VariantPopup {
  constructor(events, emoji, options) {
    this.events = events;
    this.emoji = emoji;
    this.options = options;
  }

  getEmoji(index) {
    return this.popup.querySelectorAll('.emoji-picker__emoji')[index];
  }

  setFocusedEmoji(newIndex) {
    const currentFocusedEmoji = this.getEmoji(this.focusedEmojiIndex);
    currentFocusedEmoji.tabIndex = -1;

    this.focusedEmojiIndex = newIndex;
    const newFocusedEmoji = this.getEmoji(this.focusedEmojiIndex);
    newFocusedEmoji.tabIndex = 0;
    newFocusedEmoji.focus();
  }

  render() {
    this.popup = createElement('div', CLASS_POPUP);

    const overlay = createElement('div', CLASS_OVERLAY);
    overlay.addEventListener('click', event => {
      event.stopPropagation();

      if (!this.popup.contains(event.target)) {
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    this.popup.appendChild(
      new Emoji(this.emoji, false, false, this.events, this.options).render()
    );
    Object.keys(this.emoji.v).forEach(variant => {
      this.popup.appendChild(
        new Emoji(
          this.emoji.v[variant],
          false,
          false,
          this.events,
          this.options
        ).render()
      );
    });

    const firstEmoji = this.popup.querySelector('.emoji-picker__emoji');
    this.focusedEmojiIndex = 0;
    firstEmoji.tabIndex = 0;

    setTimeout(() => firstEmoji.focus());

    this.popup.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        this.setFocusedEmoji(
          Math.min(
            this.focusedEmojiIndex + 1,
            this.popup.querySelectorAll('.emoji-picker__emoji').length - 1
          )
        );
      } else if (event.key === 'ArrowLeft') {
        this.setFocusedEmoji(Math.max(this.focusedEmojiIndex - 1, 0));
      } else if (event.key === 'Escape') {
        event.stopPropagation();
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    const closeButton = createElement('button', CLASS_CLOSE_BUTTON);
    closeButton.innerHTML = times;
    closeButton.addEventListener('click', event => {
      event.stopPropagation();
      this.events.emit(HIDE_VARIANT_POPUP);
    });
    this.popup.appendChild(closeButton);

    overlay.appendChild(this.popup);

    return overlay;
  }
}
