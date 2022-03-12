import { Emoji } from 'emojibase';
import createFocusTrap, { FocusTrap } from 'focus-trap';
import { createPopper, Instance as Popper, Placement } from '@popperjs/core';

import { View } from './view';

import { ExternalEvent, ExternalEvents } from '../ExternalEvents';
import { EmojiArea } from './EmojiArea';
import { Search } from './Search';
import { VariantPopup } from './VariantPopup';

import { Database } from '../db';
import { addOrUpdateRecent } from '../recents';

import template from 'templates/emojiPicker.ejs';
import classes from './EmojiPicker.scss';
import { EmojiPreview } from './Preview';
import { EventCallback } from '../events';

const SHOW_HIDE_DURATION = 200;

const variableNames = {
  emojisPerRow: '--emojis-per-row',
  visibleRows: '--row-count',
  emojiSize: '--emoji-size'
};

export class EmojiPicker extends View {
  private isOpen = false;

  private search: Search;
  private emojiArea: EmojiArea;
  private preview: EmojiPreview;
  private variantPopup: VariantPopup | null;

  private currentView: View;
  private focusTrap: FocusTrap;
  private popper: Popper;

  private pickerReady = false;

  private externalEvents = new ExternalEvents();

  constructor() {
    super({ template, classes });

    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  initialize() {
    this.uiElements = {
      picker: View.byClass(classes.picker),
      pickerContent: View.byClass(classes.content)
    };

    this.appEvents = {
      'data:ready': this.onDataReady,
      'content:show': this.showContent,
      'variantPopup:hide': this.hideVariantPopup,
      'emoji:select': this.selectEmoji
    };

    super.initialize();
  }

  on(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.on(event, callback);
  }

  off(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.off(event, callback);
  }

  /**
   * Builds the emoji preview area.
   */
  private buildPreview() {
    if (this.options.showPreview) {
      this.preview = this.viewFactory.create(EmojiPreview);
    }

    return this.preview;
  }

  private buildSearch() {
    if (this.options.showSearch) {
      this.search = this.viewFactory.create(Search, {
        emojisPerRow: this.options.emojisPerRow,
        customEmojis: this.options.custom,
        renderer: this.options.renderer
      });
    }

    return this.search;
  }

  private buildEmojiArea() {
    this.currentView = this.emojiArea = this.viewFactory.create(EmojiArea, {
      custom: this.options.custom,
      renderer: this.renderer
    });

    return this.emojiArea;
  }

  private setStyleProperties(): void {
    Object.keys(variableNames).forEach(key => {
      if (this.options[key]) {
        this.el.style.setProperty(variableNames[key], this.options[key].toString());
      }
    });
  }

  /**
   * Initializes the emoji picker's focus trap.
   */
  private initFocusTrap(): void {
    this.focusTrap = createFocusTrap(this.el, {
      clickOutsideDeactivates: true,
      initialFocus:
        this.options.showSearch && this.options.autoFocusSearch
          ? this.search.searchField
          : this.emojiArea.emojiCategories[0].emojiContainer.emojiElements[0]
    });
  }

  private async onDataReady() {
    const currentView = this.el;

    await super.render({
      isLoaded: true,
      search: this.buildSearch(),
      emojiArea: this.buildEmojiArea(),
      preview: this.buildPreview(),
      theme: this.options.theme
    });

    this.setStyleProperties();
    this.initFocusTrap();

    this.pickerReady = true;

    if (this.isOpen) {
      currentView.replaceWith(this.el);
      this.setPositioning();

      this.focusTrap.activate();

      this.showContent();
      this.emojiArea.reset();
    }
  }

  /**
   * Handles a click on the document, so that the picker is hidden
   * if the mouse is clicked outside of it.
   *
   * @param event The MouseEvent that was dispatched.
   */
   private onDocumentClick(event: MouseEvent): void {
    const clickedNode = event.target as Node;

    if (!this.el.contains(clickedNode) && this.isOpen) {
      this.close();
    }
  }

  async render(): Promise<HTMLElement> {
    return super.render({ isLoaded: false, theme: this.options.theme });
  }

  async open(): Promise<void> {
    this.options.rootElement.appendChild(this.el);

    this.setPositioning();

    this.isOpen = true;

    // If triggered rapidly, make sure all pending animations finish before moving on
    await Promise.all(
      this.el
        .getAnimations()
        .filter(animation => animation.playState === 'running')
        .map(animation => animation.finished)
    );

    if (this.pickerReady) {
      this.focusTrap.activate();

      this.showContent();
      this.emojiArea.reset();
    }

    await this.ui.picker.animate(
      {
        opacity: [0, 1],
        transform: ['scale(0.9)', 'scale(1)']
      },
      {
        duration: SHOW_HIDE_DURATION,
        fill: 'both',
        easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
      }
    ).finished;

    document.addEventListener('click', this.onDocumentClick);
    this.setInitialFocus();

    this.externalEvents.emit('picker:open');
  }

  async close(): Promise<void> {
    this.focusTrap?.deactivate();
    this.isOpen = false;

    // TODO scroll listener

    await this.ui.picker.animate(
      {
        opacity: [1, 0],
        transform: ['scale(1)', 'scale(0.9)']
      },
      {
        duration: SHOW_HIDE_DURATION,
        id: 'hide-picker',
        fill: 'both',
        easing: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
      }
    ).finished;

    this.options.rootElement.removeChild(this.el);
    this.search?.clear();
    this.showContent();

    this.hideVariantPopup();
    this.popper?.destroy();

    this.externalEvents.emit('picker:close');

    document.removeEventListener('click', this.onDocumentClick);
  }

  private setInitialFocus() {
    if (this.search && this.options.autoFocusSearch) {
      this.search.focus();
    } else {
      this.emojiArea.emojiCategories[0].emojiContainer.emojiElements[0].focus();
    }
  }

  private setPositioning() {
    if (typeof this.options.position === 'string') {
      this.setRelativePosition();
    } else {
      this.setFixedPosition();
    }
  }

  /**
   * Sets fixed positioning.
   */
  private setFixedPosition(): void {
    if (this.options.position) {
      this.el.style.position = 'fixed';

      const fixedPosition = this.options.position;

      Object.keys(fixedPosition).forEach(key => {
        this.el.style[key] = fixedPosition[key];
      });
    }
  }

  /**
   * Sets relative positioning with Popper.js.
   *
   * @param referenceEl The element to position relative to.
   */
  private setRelativePosition(): void {
    if (!this.options.referenceElement) {
      throw new Error('Reference element is required for relative positioning');
    }

    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = createPopper(this.options.referenceElement, this.el, {
      placement: this.options.position as Placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5]
          }
        }
      ]
    });
  }

  /**
   * Shows content in the main picker content area.
   * If no View is specified, the built-in emoji area will be shown.
   *
   * The currently shown view will be removed from the DOM and destroyed.
   *
   * @param content The View to show
   */
  private showContent(content?: View) {
    // Destroy the current view being removed unless it's the built-in emoji area,
    // we don't want (or need) to destroy and re-create that!
    if (this.currentView !== this.emojiArea) {
      this.currentView?.destroy();
    }

    // If no content specified, show the emoji area
    this.currentView = content || this.emojiArea;
    this.ui.pickerContent.replaceChildren(this.currentView.el);

    // Reset the emoji area to make sure the correct initial category is selected
    if (this.currentView === this.emojiArea) {
      this.emojiArea.reset();
    }
  }

  private hideVariantPopup() {
    if (this.variantPopup?.el?.isConnected) {
      // Don't hide the popup right away, otherwise
      // the check in onDocumentClick will register a click outside
      // of the picker and close the picker (which we may not want).
      setTimeout(() => {
        if (this.variantPopup?.el) {
          this.ui.picker.removeChild(this.variantPopup.el);
          this.variantPopup.destroy();
          this.variantPopup = null;
        }
      });
    }
  }

  private async selectEmoji({ emoji }: { emoji: Emoji }): Promise<void> {
    // Show the variant popup if the emoji has variants
    if (emoji.skins && this.options.showVariants && !this.variantPopup) {
      this.showVariantPopup(emoji);
    } else {
      this.hideVariantPopup();
      await this.emitEmoji(emoji);
    }
  }

  /**
   * Shows the variant popup for an emoji.
   *
   * @param emoji The emoji whose variants are to be shown.
   */
  private async showVariantPopup(emoji: Emoji): Promise<void> {
    this.variantPopup = this.viewFactory.create(VariantPopup, { emoji });
    this.ui.picker.appendChild(await this.variantPopup.render());
  }

  private async emitEmoji(emoji: Emoji): Promise<void> {
    this.externalEvents.emit('emoji:select', await this.renderer.emit(emoji));
    if (this.options.autoHide) {
      await this.close();
    }

    addOrUpdateRecent(emoji, this.options.maxRecents);
    this.events.emit('recent:add', emoji);
  }
}
