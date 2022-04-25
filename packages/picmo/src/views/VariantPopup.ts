import { View } from './view';

import { EmojiContainer } from './EmojiContainer';
import { EmojiRecord } from '../types';
import { animate } from '../util';
import { FocusTrap } from '../focusTrap';

import template from './VariantPopup.template';
import classes from './VariantPopup.scss';

type VariantPopupOptions = {
  emoji: EmojiRecord;
  parent: HTMLElement;
};

const animationOptions = {
  easing: 'ease-in-out',
  duration: 250,
  fill: 'both' as FillMode
};

const overlayAnimation = {
  opacity: [0, 1]
};

const popupAnimation = {
  opacity: [0, 1],
  transform: ['scale3d(0.8, 0.8, 0.8)', 'scale3d(1, 1, 1)']
};

export class VariantPopup extends View {
  private focusedEmojiIndex = 0;

  private emoji: EmojiRecord;
  private renderedEmojis: HTMLElement[];

  private emojiContainer: EmojiContainer;
  private focusTrap = new FocusTrap();

  constructor({ emoji, parent }: VariantPopupOptions) {
    super({ template, classes, parent });

    this.emoji = emoji;
  }

  initialize() {
      this.uiElements = {
        popup: View.byClass(classes.variantPopup)
      };

      this.uiEvents = [
        View.uiEvent('click', this.handleClick),
        View.uiEvent('keydown', this.handleKeydown)
      ]

      super.initialize();
  }

  animateShow = () => 
    Promise.all([
      animate(this.el, overlayAnimation, animationOptions, this.options),
      animate(this.ui.popup, popupAnimation, animationOptions, this.options)
    ]);

  animateHide() {
    const hideOptions: KeyframeAnimationOptions = { ...animationOptions, direction: 'reverse' };

    return Promise.all([
      animate(this.el, overlayAnimation, hideOptions, this.options),
      animate(this.ui.popup, popupAnimation, hideOptions, this.options),
    ]);
  }

  private async hide() {
    await this.animateHide();
    this.events.emit('variantPopup:hide');
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hide();
      event.stopPropagation();
    }
  }

  private handleClick(event): void {
    if (!this.ui.popup.contains(event.target as Node)) {
      this.hide();
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
    this.focusTrap.deactivate();
    super.destroy();
  }

  renderSync(): HTMLElement {
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

    super.renderSync({ emojis: this.emojiContainer });

    if (emojis.length < this.options.emojisPerRow) {
      this.el.style.setProperty('--emojis-per-row', emojis.length.toString());
    }

    return this.el;
  }

  activate() {
    this.emojiContainer.setActive(true, { row: 0, offset: 0}, true);
    this.focusTrap.activate(this.el);
  }
}
