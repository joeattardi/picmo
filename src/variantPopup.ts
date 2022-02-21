import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';
import { queryByClass, getEmojiForEvent } from './util';

import { EMOJI, HIDE_VARIANT_POPUP } from './events';

import { renderTemplate } from './templates';
import template from './templates/variantPopup.ejs';
import Renderer from './renderers/renderer';

import classes from './variantPopup.scss';

type VariantPopupOptions = {
  emoji: any;
  events: Emitter;
  renderer: Renderer;
};

export class VariantPopup {
  private popup: HTMLElement;
  private focusedEmojiIndex = 0;

  private events: Emitter;
  private emoji: any;
  private emojiOptions: any[];
  private renderer: Renderer;
  private renderedEmojis: HTMLElement[];

  constructor({ events, emoji, renderer }: VariantPopupOptions) {
    this.events = events;
    this.emoji = emoji;
    this.renderer = renderer;
    this.emojiOptions = [
      this.emoji,
      ...this.emoji.variations.map(variation => ({
        emoji: variation
      }))
    ];
  }

  getEmoji(index: number): Element {
    return this.renderedEmojis[index];
  }

  setFocusedEmoji(newIndex: number): void {
    const currentFocusedEmoji = this.getEmoji(this.focusedEmojiIndex) as HTMLElement;
    currentFocusedEmoji.tabIndex = -1;

    this.focusedEmojiIndex = newIndex;
    const newFocusedEmoji = this.getEmoji(this.focusedEmojiIndex) as HTMLElement;
    newFocusedEmoji.tabIndex = 0;
    newFocusedEmoji.focus();
  }

  async render(): Promise<HTMLElement> {
    const container = renderTemplate(template, { classes });
    this.popup = queryByClass(container, classes.variantPopup);

    container.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();

      if (!this.popup.contains(event.target as Node)) {
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    const emojis = [
      new Emoji({
        emoji: this.emoji,
        showVariants: false,
        showPreview: false,
        events: this.events,
        renderer: this.renderer
      })
    ];

    if (this.emoji.variations) {
      emojis.push(
        ...this.emoji.variations.map(
          (variation, index) =>
            new Emoji({
              emoji: {
                name: this.emoji.name,
                emoji: variation,
                key: this.emoji.name + index
              },
              showVariants: false,
              showPreview: false,
              events: this.events,
              renderer: this.renderer
            })
        )
      );
    }

    this.renderedEmojis = await Promise.all(emojis.map(emoji => emoji.render()));
    this.popup.append(...this.renderedEmojis);

    const [firstEmoji] = this.renderedEmojis;
    this.focusedEmojiIndex = 0;
    firstEmoji.tabIndex = 0;

    this.popup.addEventListener('click', event => this.selectEmoji(event));

    setTimeout(() => firstEmoji.focus());

    this.popup.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, this.renderedEmojis.length - 1));
      } else if (event.key === 'ArrowLeft') {
        this.setFocusedEmoji(Math.max(this.focusedEmojiIndex - 1, 0));
      } else if (event.key === 'Escape') {
        event.stopPropagation();
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    return container;
  }

  private selectEmoji(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojiOptions);
    if (emoji) {
      this.events.emit(EMOJI, {
        emoji,
        showVariants: false
      });
    }
  }
}
