import { View } from './view';

import template from '../templates/variantPopup.ejs';

import classes from './VariantPopup.scss';
import { EmojiContainer } from './EmojiContainer';
import { EmojiRecord } from '../types';

type VariantPopupOptions = {
  emoji: EmojiRecord;
};

export class VariantPopup extends View {
  private focusedEmojiIndex = 0;

  private emoji: EmojiRecord;
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

  destroy() {
    this.emojiContainer.destroy();
    super.destroy();
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
}
