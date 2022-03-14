import { Emoji } from 'emojibase';
import { View } from './view';
import { getEmojiForEvent } from '../util';

import template from '../templates/variantPopup.ejs';

import classes from './VariantPopup.scss';
import { EmojiContainer } from './EmojiContainer';

type VariantPopupOptions = {
  emoji: Emoji;
};

export class VariantPopup extends View {
  private focusedEmojiIndex = 0;

  private emoji: Emoji;
  private emojiOptions: any[];
  private renderedEmojis: HTMLElement[];

  private emojiContainer: EmojiContainer;

  constructor({ emoji }: VariantPopupOptions) {
    super({ template, classes });

    this.emoji = emoji;
  }

  initialize() {
      this.uiElements = {
        popup: View.byClass(classes.variantPopup)
      };

      this.uiEvents = [
        View.uiEvent('click', this.handleClick)
      ]

      super.initialize();
  }

  handleClick(event): void {
    if (!this.ui.popup.contains(event.target as Node)) {
      this.events.emit('variantPopup:hide');
    }
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
    const baseEmoji = {
      ...this.emoji,
      skins: null
    };

    const variants = (this.emoji.skins || []).map(variant => ({
      ...variant,
      label: this.emoji.label,
      tags: this.emoji.tags
    }));

    const emojis = [baseEmoji, ...variants];
    this.emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis,
      preview: false
    })

    await super.render({ emojis: this.emojiContainer });

    if (emojis.length < this.options.emojisPerRow) {
      this.el.style.setProperty('--emojis-per-row', emojis.length.toString());
    }

    return this.el;
  }

  // async render(): Promise<HTMLElement> {
  //   await super.render();

  //   const emojis = [
  //     this.viewFactory.create(Emoji, { emoji: this.emoji })
  //   ];

  //   if (this.emoji.variations) {
  //     emojis.push(
  //       ...this.emoji.variations.map(
  //         (variation, index) =>
  //           this.viewFactory.create(Emoji, {
  //             emoji: {
  //               name: this.emoji.name,
  //               emoji: variation,
  //               key: this.emoji.name + index
  //             }
  //           })
  //       )
  //     );
  //   }

  //   this.renderedEmojis = await Promise.all(emojis.map(emoji => emoji.render()));
  //   this.ui.popup.append(...this.renderedEmojis);

  //   const [firstEmoji] = this.renderedEmojis;
  //   this.focusedEmojiIndex = 0;
  //   firstEmoji.tabIndex = 0;

  //   this.ui.popup.addEventListener('click', event => this.selectEmoji(event));

  //   setTimeout(() => firstEmoji.focus());

  //   this.ui.popup.addEventListener('keydown', event => {
  //     if (event.key === 'ArrowRight') {
  //       this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, this.renderedEmojis.length - 1));
  //     } else if (event.key === 'ArrowLeft') {
  //       this.setFocusedEmoji(Math.max(this.focusedEmojiIndex - 1, 0));
  //     } else if (event.key === 'Escape') {
  //       event.stopPropagation();
  //       this.events.emit('variantPopup:hide');
  //     }
  //   });

  //   return this.el;
  // }

  private selectEmoji(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojiOptions);
    if (emoji) {
      this.events.emit('emoji:select', {
        emoji,
        showVariants: false
      });
    }
  }
}
