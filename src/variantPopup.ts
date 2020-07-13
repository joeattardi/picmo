import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';
import { createElement } from './util';

import { HIDE_VARIANT_POPUP } from './events';

import { EmojiRecord, EmojiButtonOptions } from './types';

import {
  CLASS_VARIANT_OVERLAY,
  CLASS_VARIANT_POPUP,
  CLASS_EMOJI
} from './classes';

export class VariantPopup {
  private popup: HTMLElement;
  private focusedEmojiIndex = 0;

  constructor(
    private events: Emitter,
    private emoji: EmojiRecord,
    private options: EmojiButtonOptions
  ) {}

  getEmoji(index: number): Element {
    return this.popup.querySelectorAll(`.${CLASS_EMOJI}`)[index];
  }

  setFocusedEmoji(newIndex: number): void {
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
    this.popup = createElement('div', CLASS_VARIANT_POPUP);

    const overlay = createElement('div', CLASS_VARIANT_OVERLAY);
    overlay.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();

      if (!this.popup.contains(event.target as Node)) {
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    this.popup.appendChild(
      new Emoji(
        this.emoji,
        false,
        false,
        this.events,
        this.options,
        false
      ).render()
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
          this.options,
          false
        ).render()
      )
    );

    const firstEmoji = this.popup.querySelector(
      `.${CLASS_EMOJI}`
    ) as HTMLElement;
    this.focusedEmojiIndex = 0;
    firstEmoji.tabIndex = 0;

    setTimeout(() => firstEmoji.focus());

    this.popup.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        this.setFocusedEmoji(
          Math.min(
            this.focusedEmojiIndex + 1,
            this.popup.querySelectorAll(`.${CLASS_EMOJI}`).length - 1
          )
        );
      } else if (event.key === 'ArrowLeft') {
        this.setFocusedEmoji(Math.max(this.focusedEmojiIndex - 1, 0));
      } else if (event.key === 'Escape') {
        event.stopPropagation();
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    overlay.appendChild(this.popup);

    return overlay;
  }
}
