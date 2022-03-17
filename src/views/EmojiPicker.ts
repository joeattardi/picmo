import createFocusTrap, { FocusTrap } from 'focus-trap';

import { ExternalEvent, ExternalEvents } from '../ExternalEvents';

import { View } from './view';
import { EmojiArea } from './EmojiArea';
import { EmojiPreview } from './Preview';
import { Search } from './Search';
import { VariantPopup } from './VariantPopup';

import { addOrUpdateRecent } from '../recents';
import { EventCallback } from '../events';
import { PositionCleanup, setPosition } from '../positioning';
import { prefersReducedMotion } from '../util';

import template from '../templates/emojiPicker.ejs';
import classes from './EmojiPicker.scss';
import { EmojiRecord } from '../types';

const SHOW_HIDE_DURATION = 150;

const variableNames = {
  emojisPerRow: '--emojis-per-row',
  visibleRows: '--row-count',
  emojiSize: '--emoji-size'
};

/**
 * The main emoji picker view. Contains the full picker UI and an event emitter to react to
 * emoji selection events.
 */
export class EmojiPicker extends View {
  isOpen = false;

  private search: Search;
  private emojiArea: EmojiArea;
  private preview: EmojiPreview;
  private variantPopup: VariantPopup | null;

  private currentView: View;
  private focusTrap: FocusTrap;
  private positionCleanup: PositionCleanup;

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

    this.uiEvents = [
      View.uiEvent('keydown', this.handlePickerKeydown)
    ];

    this.appEvents = {
      'data:ready': this.onDataReady,
      'content:show': this.showContent,
      'variantPopup:hide': this.hideVariantPopup,
      'emoji:select': this.selectEmoji
    };

    document.addEventListener('click', this.onDocumentClick);

    super.initialize();
  }

  /**
   * Destroys the picker when it is no longer needed.
   * After calling this method, the picker will no longer be usable.
   * 
   * If this is called while the picker is open, it will be closed first.
   * 
   * @returns a Promise that resolves when the close/destroy is complete.
   */
  async destroy(): Promise<void> {
    document.removeEventListener('click', this.onDocumentClick);
    if (this.isOpen) {
      await this.close();
    }

    super.destroy();

    this.events.removeAll();
  }

  /**
   * Listens for a picker event.
   * 
   * @param event The event to listen for
   * @param callback The callback to call when the event is triggered
   */
  on(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.on(event, callback);
  }

  /**
   * Removes a recent emoji from the picker.
   * 
   * @param event The event to stop listening for
   * @param callback The previously bound event listener
   */
  off(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.off(event, callback);
  }

  /**
   * Toggles the visible state of the picker
   * If the picker is currently open, it will be closed, and if it si currently closed, it will be opened.
   * 
   * @returns a Promise that resolves when the visibility state change is complete
   */
  toggle(): Promise<void> {
    return this.isOpen ? this.close() : this.open();
  }

  /**
   * Opens the picker.
   * 
   * @returns a Promise that resolves when the picker is finished opening
   */
  async open(): Promise<void> {
    if (this.isOpen) {
      return;
    }

    await this.initiateOpenStateChange(true);

    this.options.rootElement.appendChild(this.el);
    this.setPosition();

    if (this.pickerReady) {
      this.initializePickerView();
    }

    await this.animateOpenStateChange(true);

    this.setInitialFocus();
    this.externalEvents.emit('picker:open');
  }

  /**
   * Closes the picker
   * 
   * @returns a Promise that resolves when the picker is finished closing
   */
  async close(): Promise<void> {
    if (!this.isOpen) {
      return;
    }

    await this.initiateOpenStateChange(false);

    this.focusTrap?.deactivate();

    // TODO scroll listener

    await this.animateOpenStateChange(false);

    this.el.remove();
    this.search?.clear();
    this.showContent();

    this.hideVariantPopup();
    this.positionCleanup();

    this.externalEvents.emit('picker:close');
  }

  /**
   * Finishes setting up the picker view once the data is ready.
   * This will only be called if the emoji data is available and all
   * emoji picker views have been rendered.
   * 
   * This is the last thing to happen before the emoji picker UI becomes visible.
   */
  private initializePickerView() {
    this.focusTrap.activate();
    this.emojiArea.reset();
    this.showContent();
  }

  /**
   * Initiates an animation either for opening or closing the picker using the Web Animations API.
   * If animations are not enabled or supported, the picker will be immediately opened or closed.
   * 
   * @param openState The desired open state of the picker
   * @returns The Animation object that is running
   */
  private async animateOpenStateChange(openState: boolean): Promise<Animation | void> {
    return this.ui.picker.animate?.({
      opacity: [0, 1],
      transform: ['scale(0.9)', 'scale(1)']
    }, {
      duration: prefersReducedMotion() ? 0 : SHOW_HIDE_DURATION,
      id: openState ? 'show-picker' : 'hide-picker',
      fill: 'both',
      easing: 'ease-in-out',
      direction: openState ? 'normal' : 'reverse'
    }).finished;
  }

  /**
   * Prepares for an animation either for opening or closing the picker.
   * If other animations are still running (this will happen when toggled rapidly), this will wait for them to finish.
   * 
   * It will mark the new open state immediately then wait for pending animations to finish.
   * 
   * @param openState The desired open state
   */
  private async initiateOpenStateChange(openState: boolean) {
    this.isOpen = openState;
    await this.awaitPendingAnimations();
  }

  /**
   * Finds any pending (running) animations on the picker element.
   * 
   * @returns an array of Animation objects that are in the 'running' state.
   */
  private getRunningAnimations(): Animation[] {
    return this.ui.picker.getAnimations().filter(animation => animation.playState === 'running');
  }

  /**
   * Waits for all pending animations on the picker element to finish.
   * 
   * @returns a Promise that resolves when all animations have finished
   */
  private awaitPendingAnimations(): Promise<Animation[]> {
    return Promise.all(this.getRunningAnimations().map(animation => animation.finished));
  }

  /**
   * Sets up the picker positioning.
   */
  private setPosition() {
    this.positionCleanup?.();
    this.positionCleanup = setPosition(this.el, this.options.referenceElement, this.options.position);
  }

  /**
   * Top-level keyboard event handler for the picker.
   * @param event the keydown event
   */
  private handlePickerKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Builds the three sections of the picker:
   * 
   * - preview area (if enabled in options)
   * - search area (if enabled in options)
   * - emoji area (always shown)
   * 
   * @returns an array containing the three child views. The preview and search
   *          views are optional, and will be undefined if they are not enabled.
   */
  private buildChildViews(): [EmojiPreview, Search, EmojiArea] {
    if (this.options.showPreview) {
      this.preview = this.viewFactory.create(EmojiPreview);
    }

    if (this.options.showSearch) {
      this.search = this.viewFactory.create(Search, {
        emojisPerRow: this.options.emojisPerRow,
        renderer: this.options.renderer
      });
    }

    this.currentView = this.emojiArea = this.viewFactory.create(EmojiArea);

    return [this.preview, this.search, this.emojiArea];
  }

  /**
   * Sets any CSS variables corresponding to options that were set.
   */
  private setStyleProperties() {
    Object.keys(variableNames).forEach(key => {
      if (this.options[key]) {
        this.el.style.setProperty(variableNames[key], this.options[key].toString());
      }
    });
  }

  /**
   * Initializes the emoji picker's focus trap.
   */
  private createFocusTrap() {
    this.focusTrap = createFocusTrap(this.el, {
      clickOutsideDeactivates: true,
      initialFocus:
        this.options.showSearch && this.options.autoFocusSearch
          ? this.search.searchField
          : this.emojiArea.focusableEmoji
    });
  }

  /**
   * Called when the emoji database is ready to be used.
   * 
   * This will replace the loader placeholder with the full picker UI.
   */
  private async onDataReady() {
    // Save the current el so we can replace it in the DOM after
    // the new render.
    const currentView = this.el;

    const [preview, search, emojiArea] = this.buildChildViews();

    await super.render({
      isLoaded: true,
      search,
      emojiArea,
      preview,
      theme: this.options.theme
    });

    this.setStyleProperties();
    this.createFocusTrap();

    this.pickerReady = true;

    // If the data becomes ready when the picker is open,
    // finish setting up the picker UI. Otherwise this will be done
    // next time it is opened.
    if (this.isOpen) {
      currentView.replaceWith(this.el);
      this.setPosition();
      this.initializePickerView();
    }
  }

  /**
   * Handles a click on the document, so that the picker is closed
   * if the mouse is clicked outside of it.
   * 
   * The picker will only be closed if:
   * - The picker is currently open
   * - The click target is not the trigger element or any of its children
   * - The click target is not the picker or any of its children
   *
   * @param event The MouseEvent that was dispatched.
   */
   private onDocumentClick(event: MouseEvent) {
    const clickedNode = event.target as Node;

    const isClickInsidePicker = this.el.contains(clickedNode);
    const isClickOnTrigger = this.options.triggerElement?.contains(clickedNode);

    if (this.isOpen && !isClickOnTrigger && !isClickInsidePicker) {
      this.close();
    }
  }

  /**
   * Renders the picker.
   * 
   * @returns the root element of the picker
   */
  async render(): Promise<HTMLElement> {
    return super.render({ isLoaded: false, theme: this.options.theme });
  }

  /**
   * Sets the initial autofocus, depending on options.
   */
  private setInitialFocus() {
    if (this.search && this.options.autoFocusSearch) {
      this.search.focus();
    } else {
      this.emojiArea.focusableEmoji.focus();
    }
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

  /**
   * Closes and destroys the variant popup.
   */
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

  /**
   * Handles a click on an emoji.
   * @param emoji The emoji that was clicked
   * @returns a Promise that resolves when either the variant popup is shown or the emoji is rendered and emitted
   */
  private async selectEmoji({ emoji }: { emoji: EmojiRecord }): Promise<void> {
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
   * @returns a Promise that resolves when the popup is shown
   */
  private async showVariantPopup(emoji: EmojiRecord): Promise<void> {
    this.variantPopup = this.viewFactory.create(VariantPopup, { emoji });
    this.ui.picker.appendChild(await this.variantPopup.render());
  }

  /**
   * Renders an emoji, and emits a public emoji:select event with the rendered result.
   * @param emoji the emoji that was selected.
   */
  private async emitEmoji(emoji: EmojiRecord): Promise<void> {
    this.externalEvents.emit('emoji:select', await this.renderer.doEmit(emoji));
    if (this.options.autoHide) {
      await this.close();
    }

    addOrUpdateRecent(emoji, this.options.maxRecents);
    this.events.emit('recent:add', emoji);
  }
}
