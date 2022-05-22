import {
  animate,
  getOptions as getPickerOptions,
  EmojiPicker,
  EventCallback,
  createPicker,
  FocusTrap,
  PickerOptions,
  ExternalEvent,
} from 'picmo';
import { PopupEvent, PopupEvents } from './PopupEvents';
import { setPosition, PositionCleanup } from './positioning';
import { PopupOptions, Position } from './types';
import { getOptions } from './options';

import classes from './popupPicker.scss';
import closeIcon from './icons/close.svg';

export class PopupPickerController {
  picker: EmojiPicker;
  isOpen = false;

  private popupEl: HTMLElement;
  private focusTrap: FocusTrap;
  private positionCleanup: PositionCleanup;

  private closeButton: HTMLElement;
  private options: PickerOptions & PopupOptions;
  private externalEvents = new PopupEvents();

  constructor(pickerOptions: Partial<PickerOptions>, popupOptions: Partial<PopupOptions>) {
    this.options = { ...getOptions(popupOptions), ...getPickerOptions(pickerOptions) };

    this.popupEl = document.createElement('div');
    this.popupEl.classList.add(classes.popupContainer);
    this.popupEl.classList.add(this.options.theme);

    if (popupOptions.className) {
      this.popupEl.classList.add(popupOptions.className);
    }

    if (this.options.showCloseButton) {
      this.closeButton = document.createElement('button');
      this.closeButton.classList.add(classes.closeButton);
      this.closeButton.innerHTML = closeIcon;
      this.popupEl.appendChild(this.closeButton);
    }

    const pickerContainer = document.createElement('div');
    this.popupEl.appendChild(pickerContainer);

    this.picker = createPicker({ ...this.options, rootElement: pickerContainer });
    this.focusTrap = new FocusTrap();

    this.picker.addEventListener('data:ready', () => {
      this.focusTrap.activate(this.picker.el);
      this.picker.setInitialFocus();
    });

    if (this.options.hideOnEmojiSelect) {
      this.picker.addEventListener('emoji:select', () => {
        this.close();
      });
    }

    if (this.options.hideOnClickOutside) {
      this.onDocumentClick = this.onDocumentClick.bind(this);
      document.addEventListener('click', this.onDocumentClick);
    }

    if (this.options.hideOnEscape) {
      this.handleKeydown = this.handleKeydown.bind(this);
      this.popupEl.addEventListener('keydown', this.handleKeydown);
    }
  }

  /**
   * Listens for a picker event.
   *
   * @param event The event to listen for
   * @param callback The callback to call when the event is triggered
   */
  addEventListener(event: PopupEvent, callback: EventCallback) {
    this.externalEvents.on(event, callback);
    this.picker.addEventListener(event as ExternalEvent, callback);
  }

  removeEventListener(event: PopupEvent, callback: EventCallback) {
    this.externalEvents.off(event, callback);
    this.picker.removeEventListener(event as ExternalEvent, callback);
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Destroys the picker when it is no longer needed.
   * After calling this method, the picker will no longer be usable.
   *
   * If this is called while the picker is open, it will be closed first.
   *
   * @returns a Promise that resolves when the close/destroy is complete.
   */
  async destroy() {
    if (this.isOpen) {
      await this.close();
    }

    document.removeEventListener('click', this.onDocumentClick);

    this.picker.destroy();
    this.externalEvents.removeAll();
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
    this.options.rootElement.appendChild(this.popupEl);
    this.setPosition();
    this.picker.reset();

    await this.animatePopup(true);
    await this.animateCloseButton(true);
    this.picker.setInitialFocus();
    this.externalEvents.emit('picker:open');
  }

  /**
   * Closes the picker.
   *
   * @returns a Promise that resolves when the picker is finished closing
   */
  async close(): Promise<void> {
    if (!this.isOpen) {
      return;
    }

    await this.initiateOpenStateChange(false);
    await this.animateCloseButton(false);
    await this.animatePopup(false);

    this.popupEl.remove();
    this.picker.reset();
    this.positionCleanup();

    this.focusTrap.deactivate();
    this.options.triggerElement?.focus();
    this.externalEvents.emit('picker:close');
  }

  /**
   * Finds any pending (running) animations on the picker element.
   *
   * @returns an array of Animation objects that are in the 'running' state.
   */
  private getRunningAnimations(): Animation[] {
    return this.picker.el.getAnimations().filter(animation => animation.playState === 'running');
  }

  /**
   * Sets up the picker positioning.
   */
  private setPosition() {
    this.positionCleanup?.();
    if (this.options.referenceElement) {
      this.positionCleanup = setPosition(
        this.popupEl,
        this.options.referenceElement,
        this.options.position as Position
      );
    }
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

    const isClickOnTrigger = this.options.triggerElement?.contains(clickedNode);

    if (this.isOpen && !this.picker.isPickerClick(event) && !isClickOnTrigger) {
      this.close();
    }
  }

  private animatePopup(openState: boolean) {
    return animate(
      this.picker.el,
      {
        opacity: [0, 1],
        transform: ['scale(0.9)', 'scale(1)']
      },
      {
        duration: 150,
        id: openState ? 'show-picker' : 'hide-picker',
        easing: 'ease-in-out',
        direction: openState ? 'normal' : 'reverse',
        fill: 'both'
      },
      this.options
    );
  }

  private animateCloseButton(openState: boolean) {
    if (this.closeButton) {
      return animate(this.closeButton, {
        opacity: [0, 1]
      },
      {
        duration: 25,
        id: openState ? 'show-close' : 'hide-close',
        easing: 'ease-in-out',
        direction: openState ? 'normal' : 'reverse',
        fill: 'both',
      },
      this.options);
    }
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
}
