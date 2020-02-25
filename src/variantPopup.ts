import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';
import { createElement } from './util';

import { HIDE_VARIANT_POPUP } from './events';

import { times } from './icons';
import { EmojiRecord, EmojiButtonOptions } from './types';

const CLASS_OVERLAY = 'emoji-picker__variant-overlay';
const CLASS_POPUP = 'emoji-picker__variant-popup';
const CLASS_CLOSE_BUTTON = 'emoji-picker__variant-popup-close-button';

export class VariantPopup {
  private popup: HTMLElement;
  private focusedEmojiIndex = 0;

  constructor(
    private events: Emitter,
    private emoji: EmojiRecord,
    private options: EmojiButtonOptions
  ) {}

  getEmoji(index): Element {
    return this.popup.querySelectorAll('.emoji-picker__emoji')[index];
  }

  setFocusedEmoji(newIndex): void {
    const currentFocusedEmoji = this.getEmoji(
      this.focusedEmojiIndex
    ) as HTMLElement;
    currentFocusedEmoji.tabIndex = -1;

    this.focusedEmojiIndex = newIndex;
    const newFocusedEmoji = this.getEmoji(
      this.focusedEmojiIndex
    ) as HTMLElement;
    newFocusedEmoji.tabIndex = 0;
    newFocusedEmoji.focus();
  }

  render(): HTMLElement {
    this.popup = createElement('div', CLASS_POPUP);

    const overlay = createElement('div', CLASS_OVERLAY);
    overlay.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();

      if (!this.popup.contains(event.target as Node)) {
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    this.popup.appendChild(
      new Emoji(this.emoji, false, false, this.events, this.options).render()
    );

    (this.emoji.variations || []).forEach((variation, index) =>
      this.popup.appendChild(
        new Emoji(
          {
            name: this.emoji.name,
            emoji: variation,
            key: this.emoji.name + index
          },
          false,
          false,
          this.events,
          this.options
        ).render()
      )
    );

    const firstEmoji = this.popup.querySelector(
      '.emoji-picker__emoji'
    ) as HTMLElement;
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
