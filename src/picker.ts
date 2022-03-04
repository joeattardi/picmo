import classes from './picker.scss';

import createFocusTrap, { FocusTrap } from 'focus-trap';
import { TinyEmitter as Emitter } from 'tiny-emitter';
import { createPopper, Instance as Popper, Placement } from '@popperjs/core';

import emojiData from './data/emoji';

import { light } from './themes';

import { AppEvents } from './AppEvents';
import { ExternalEvents, ExternalEventKey } from './ExternalEvents';
import { EventCallback } from './events';
import { LazyLoader } from './LazyLoader';
import { EmojiPreview } from './views/Preview';
import { Search } from './views/Search';
import { buildEmojiCategoryData, queryByClass } from './util';
import { VariantPopup } from './views/VariantPopup';

import { Bundle } from './i18n';

import { PickerOptions, CustomEmoji, Position } from './types';

import { EmojiArea } from './views/EmojiArea';
import { save } from './recent';

import { renderTemplate } from './templates';
import template from 'templates/picker.ejs';

import en from './i18n/lang-en';
import NativeRenderer from './renderers/native';
import { Renderer } from './renderers/renderer';
import { EmojiContainer } from './views/EmojiContainer';
import { ViewFactory } from './viewFactory';
import { View } from './views/view';

const defaultOptions = {
  rootElement: document.body,
  renderer: new NativeRenderer(),
  theme: light,

  showSearch: true,
  showCategoryButtons: true,
  showVariants: true,
  showBoolean: true,
  showRecents: true,
  showPreview: true,

  autoHide: true,
  autoFocusSearch: true,

  position: 'auto',
  emojisPerRow: 8,

  emojiVersion: '12.1',
  maxRecents: 50,
  locale: en
};

export { LazyLoader };

const SHOW_HIDE_DURATION = 200;

function getOption(options: PickerOptions, key: keyof PickerOptions) {
  return options[key] ?? defaultOptions[key];
}

//    if (this.emojisPerRow) {
// this.pickerEl.style.setProperty('--emoji-per-row', this.emojisPerRow.toString());
// }

const variableNames = {
  emojisPerRow: '--emojis-per-row',
  visibleRows: '--row-count',
  emojiSize: '--emoji-size'
};

export class EmojiPicker {
  private pickerVisible = false;

  private currentView: View;

  private events = new AppEvents();
  private externalEvents = new ExternalEvents();
  private i18n: Bundle;

  private pickerEl: HTMLElement;
  private pickerContent: HTMLElement;
  private wrapper: HTMLElement;
  private pluginContainer: HTMLElement;
  private focusTrap: FocusTrap;

  private emojiArea: EmojiArea;
  private search: Search;

  private renderer: Renderer;

  private customEmojis: CustomEmoji[] = [];

  private overlay?: HTMLElement;
  private rootElement: HTMLElement;
  private referenceElement?: HTMLElement;

  private position: Position;
  private emojisPerRow: number;
  private visibleRows: number;
  private emojiSize: string;
  private emojiVersion: string;
  private maxRecents: number;

  private popper: Popper;

  private preview: EmojiPreview;
  private variantPopup: VariantPopup;

  private showCategoryButtons: boolean;
  private showSearch: boolean;
  private showVariants: boolean;
  private showRecents: boolean;
  private showPreview: boolean;

  private autoHide: boolean;
  private autoFocusSearch: boolean;

  private viewFactory: ViewFactory;

  private theme: string;

  private emojiCategories: { [key: string]: any[] };

  constructor(options: PickerOptions = {}) {
    this.showSearch = getOption(options, 'showSearch');
    this.showVariants = getOption(options, 'showVariants');
    this.showCategoryButtons = getOption(options, 'showCategoryButtons');
    this.showRecents = getOption(options, 'showRecents');
    this.showPreview = getOption(options, 'showPreview');

    this.autoHide = getOption(options, 'autoHide');
    this.autoFocusSearch = getOption(options, 'autoFocusSearch');

    this.rootElement = getOption(options, 'rootElement');
    this.referenceElement = getOption(options, 'referenceElement');
    this.renderer = getOption(options, 'renderer');
    this.theme = getOption(options, 'theme');

    this.position = getOption(options, 'position');
    this.emojisPerRow = getOption(options, 'emojisPerRow');
    this.visibleRows = getOption(options, 'visibleRows');
    this.emojiSize = getOption(options, 'emojiSize');

    this.emojiVersion = getOption(options, 'emojiVersion');
    this.maxRecents = getOption(options, 'maxRecents');

    this.customEmojis = getOption(options, 'custom');

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
    this.i18n = new Bundle(getOption(options, 'locale'));
    this.emojiCategories = buildEmojiCategoryData(emojiData);

    this.viewFactory = new ViewFactory({
      events: this.events,
      i18n: this.i18n,
      renderer: this.renderer
    });

    this.buildPicker();
  }

  /**
   * Adds an event listener to the picker.
   *
   * @param event The name of the event to listen for
   * @param callback The function to call when the event is fired
   */
  on(event: ExternalEventKey, callback: EventCallback): void {
    this.externalEvents.on(event, callback);
  }

  /**
   * Removes an event listener from the picker.
   *
   * @param event The name of the event
   * @param callback The callback to remove
   */
  off(event: ExternalEventKey, callback: EventCallback): void {
    this.externalEvents.off(event, callback);
  }

  /**
   * Sets any CSS variable values that need to be set.
   */
  private setStyleProperties(): void {
    Object.keys(variableNames).forEach(key => {
      if (this[key]) {
        this.pickerEl.style.setProperty(variableNames[key], this[key].toString());
      }
    });

    // if (!this.showCategoryButtons) {
    //   this.pickerEl.style.setProperty('--category-button-height', '0');
    // }

    // TODO re-enable this once CSS is straightened out
    // if (this.options.styleProperties) {
    //   Object.keys(this.options.styleProperties).forEach(key => {
    //     if (this.options.styleProperties) {
    //       this.pickerEl.style.setProperty(key, this.options.styleProperties[key]);
    //     }
    //   });
    // }
  }

  /**
   * Emits a selected emoji event.
   * @param param0 The selected emoji and show variants flag
   */
  private async emitEmoji({ emoji, showVariants }: { emoji: any; showVariants: boolean }): Promise<void> {
    if (emoji.variations && showVariants && this.showVariants) {
      this.showVariantPopup(emoji);
    } else {
      let eventData;
      if (emoji.custom) {
        eventData = this.emitCustomEmoji(emoji);
      } else {
        eventData = await this.renderer.emit(emoji);
      }

      this.externalEvents.emit('emoji:select', eventData);

      if (this.autoHide) {
        await this.hidePicker();
      }

      if ((!emoji.variations || !showVariants || !this.showVariants) && this.showRecents) {
        save(emoji, this.maxRecents, this.events);
      }
    }
  }

  /**
   * Emits a native emoji record.
   * @param emoji The selected emoji
   */
  private emitNativeEmoji(emoji: any) {
    return {
      emoji: emoji.emoji,
      name: emoji.name
    };
  }

  /**
   * Emits a custom emoji record.
   * @param emoji The selected emoji
   */
  private emitCustomEmoji(emoji: any) {
    return {
      url: emoji.emoji,
      name: emoji.name,
      custom: true
    };
  }

  /**
   * Builds the search UI.
   */
  private buildSearch(): void {
    if (this.showSearch) {
      this.search = this.viewFactory.create(Search, {
          emojiData: emojiData.emoji,
          emojisPerRow: this.emojisPerRow,
          emojiVersion: this.emojiVersion,
          customEmojis: this.customEmojis,
          renderer: this.renderer
      });
    }
  }

  /**
   * Builds the emoji preview area.
   */
  private async buildPreview() {
    if (this.showPreview) {
      this.preview = this.viewFactory.create(EmojiPreview);
      this.pickerEl.appendChild(await this.preview.render());
    }
  }

  /**
   * TODO fix plugins later
   * Initializes any plugins that were specified.
   */
  private initPlugins(): void {
    // if (this.options.plugins) {
    //   this.pluginContainer = renderTemplate('<div class="<%= classes.pluginContainer %>"></div>');
    //   this.options.plugins.forEach(plugin => {
    //     if (!plugin.render) {
    //       throw new Error('Emoji Button plugins must have a "render" function.');
    //     }
    //     this.pluginContainer.appendChild(plugin.render(this));
    //   });
    // }
  }

  /**
   * Initializes the emoji picker's focus trap.
   */
  private initFocusTrap(): void {
    this.focusTrap = createFocusTrap(this.pickerEl as HTMLElement, {
      clickOutsideDeactivates: true,
      initialFocus:
        this.showSearch && this.autoFocusSearch
          ? this.search.searchField
          : this.emojiArea.emojiCategories[0].emojiContainer.emojiElements[0]
    });
  }

  /**
   * Builds the emoji picker.
   */
  private async buildPicker(): Promise<void> {
    // this.initPlugins(); TODO plugins later
    this.buildSearch();

    const lazyLoader = new LazyLoader();

    this.emojiArea = this.viewFactory.create(EmojiArea, {
      emojiCategoryData: this.emojiCategories,
      lazyLoader: lazyLoader,
      emojisPerRow: this.emojisPerRow,
      custom: this.customEmojis,
      showCategoryButtons: this.showCategoryButtons,
      showRecents: this.showRecents,
      renderer: this.renderer,
      emojiVersion: this.emojiVersion
    });

    this.currentView = this.emojiArea;

    this.wrapper = await renderTemplate(template, {
      classes,
      plugins: this.pluginContainer,
      search: this.search,
      emojiArea: this.emojiArea
    });

    this.pickerEl = this.wrapper.firstElementChild as HTMLElement;
    this.pickerEl.classList.add(this.theme);

    this.setStyleProperties();
    this.initFocusTrap();

    this.pickerContent = queryByClass(this.pickerEl, classes.content);

    this.events.on('content:show', this.showContent.bind(this));
    this.events.on('variantPopup:hide', this.hideVariantPopup.bind(this));
    this.events.on('emoji:select', this.emitEmoji.bind(this));

    this.buildPreview();

    // TODO bring back z-index later
    // if (this.options.zIndex) {
    //   this.wrapper.style.zIndex = this.options.zIndex + '';
    // }

    lazyLoader.observe(this.emojiArea.ui.emojis);
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
    this.pickerContent.replaceChildren(this.currentView.el);

    // Reset the emoji area to make sure the correct initial category is selected
    if (this.currentView === this.emojiArea) {
      this.emojiArea.reset();
    }
  }

  private hideVariantPopup() {
    if (this.variantPopup) {
      this.pickerEl.removeChild(this.variantPopup.el);
    }
  }

  /**
   * Shows the variant popup for an emoji.
   *
   * @param emoji The emoji whose variants are to be shown.
   */
  private async showVariantPopup(emoji: any): Promise<void> {
    this.variantPopup = this.viewFactory.create(VariantPopup, { emoji });
    this.pickerEl.appendChild(await this.variantPopup.render());
  }

  /**
   * Handles a click on the document, so that the picker is hidden
   * if the mouse is clicked outside of it.
   *
   * @param event The MouseEvent that was dispatched.
   */
  private onDocumentClick(event: MouseEvent): void {
    if (!this.pickerEl.contains(event.target as Node) && this.pickerVisible) {
      this.hidePicker();
    }
  }

  /**
   * Destroys the picker. Once this is called, the picker can no longer
   * be shown.
   */
  destroyPicker(): void {
    this.events.removeAll();

    this.rootElement.removeChild(this.wrapper);
    this.popper?.destroy();

    // TODO plugins
    // if (this.options.plugins) {
    //   this.options.plugins.forEach(plugin => {
    //     plugin.destroy && plugin.destroy();
    //   });
    // }
  }

  /**
   * Hides, but does not destroy, the picker.
   */
  async hidePicker(): Promise<void> {
    this.focusTrap.deactivate();
    this.pickerVisible = false;

    if (this.overlay) {
      document.body.removeChild(this.overlay);
      this.overlay = undefined;
    }

    // In some browsers, the delayed hide was triggering the scroll event handler
    // and stealing the focus. Remove the scroll listener before doing the delayed hide.
    this.emojiArea.ui.emojis.removeEventListener('scroll', this.emojiArea.highlightCategory);

    const animation = this.pickerEl.animate(
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
    );

    await animation.finished;

    this.rootElement.removeChild(this.wrapper);

    if (this.search) {
      this.search.clear();
      this.showContent();
    }

    this.events.emit('variantPopup:hide');

    this.popper && this.popper?.destroy();

    this.externalEvents.emit('picker:hide');

    setTimeout(() => {
      document.removeEventListener('click', this.onDocumentClick);
      document.removeEventListener('keydown', this.onDocumentKeydown);
    });
  }

  /**
   * Shows the picker.
   *
   * @param referenceEl The element to position relative to if relative positioning is used.
   */
  async showPicker(): Promise<void> {
    // If triggered rapidly, make sure all pending animations finish before moving on
    await Promise.all(
      this.pickerEl
        .getAnimations()
        .filter(animation => animation.playState === 'running')
        .map(animation => animation.finished)
    );

    this.pickerVisible = true;

    this.rootElement.appendChild(this.wrapper);
    this.focusTrap.activate();

    this.determineDisplay();

    this.pickerEl.animate(
      {
        opacity: [0, 1],
        transform: ['scale(0.9)', 'scale(1)']
      },
      {
        duration: SHOW_HIDE_DURATION,
        fill: 'both',
        easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
      }
    );

    this.showContent();
    this.emojiArea.reset();

    setTimeout(() => {
      this.addEventListeners();
      this.setInitialFocus();
    });
  }

  /**
   * Determines which display and position are used for the picker, based on
   * the viewport size and specified options.
   *
   * @param referenceEl The element to position relative to if relative positioning is used.
   */
  determineDisplay(): void {
    // if (window.matchMedia(`screen and (max-width: ${MOBILE_BREAKPOINT}px)`).matches) {
    //   this.showMobileView();
    // } else if (typeof this.options.position === 'string') {
    if (typeof this.position === 'string') {
      this.setRelativePosition();
    } else {
      this.setFixedPosition();
    }
  }

  /**
   * Sets the initial focus to the appropriate element, depending on the specified
   * options.
   */
  setInitialFocus(): void {
    // If the search field is visible and should be auto-focused, set the focus on
    // the search field. Otherwise, the initial focus will be on the first focusable emoji.

    const initialFocusElement =
      this.showSearch && this.autoFocusSearch
        ? this.search.searchField
        : this.emojiArea.emojiCategories[0].emojiContainer.emojiElements[0];

    initialFocusElement.focus();
  }

  /**
   * Adds the event listeners that will close the picker without selecting an emoji.
   */
  private addEventListeners(): void {
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onDocumentKeydown);
  }

  /**
   * Sets relative positioning with Popper.js.
   *
   * @param referenceEl The element to position relative to.
   */
  private setRelativePosition(): void {
    if (!this.referenceElement) {
      throw new Error('Reference element is required for relative positioning');
    }

    this.popper = createPopper(this.referenceElement, this.wrapper, {
      placement: this.position as Placement,
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
   * Sets fixed positioning.
   */
  private setFixedPosition(): void {
    if (this.position) {
      this.wrapper.style.position = 'fixed';

      const fixedPosition = this.position;

      Object.keys(fixedPosition).forEach(key => {
        this.wrapper.style[key] = fixedPosition[key];
      });
    }
  }

  /**
   * Shows the picker in a mobile view.
   */
  private showMobileView(): void {
    // const style = window.getComputedStyle(this.pickerEl);
    // const htmlEl = document.querySelector('html');
    // const viewportHeight = htmlEl && htmlEl.clientHeight;
    // const viewportWidth = htmlEl && htmlEl.clientWidth;
    // const height = parseInt(style.height);
    // const newTop = viewportHeight ? viewportHeight / 2 - height / 2 : 0;
    // const width = parseInt(style.width);
    // const newLeft = viewportWidth ? viewportWidth / 2 - width / 2 : 0;
    // this.wrapper.style.position = 'fixed';
    // this.wrapper.style.top = `${newTop}px`;
    // this.wrapper.style.left = `${newLeft}px`;
    // this.wrapper.style.zIndex = '5000';
    // this.overlay = createElement('div', classes.overlay);
    // document.body.appendChild(this.overlay);
  }

  /**
   * Toggles the picker's visibility.
   *
   * @param referenceEl The element to position relative to if relative positioning is used.
   */
  togglePicker(referenceEl: HTMLElement): void {
    this.pickerVisible ? this.hidePicker() : this.showPicker();
  }

  /**
   * Determines whether or not the picker is currently visible.
   * @return true if the picker is visible, false if not.
   */
  isPickerVisible(): boolean {
    return this.pickerVisible;
  }

  /**
   * Handles a keydown event on the document.
   * @param event The keyboard event that was dispatched.
   */
  private onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      // Escape closes the picker.
      this.hidePicker();
    } else if (event.key === 'Tab') {
      // The `keyboard` class adds some extra styling to indicate keyboard focus.
      this.pickerEl.classList.add('keyboard');
    } else if (event.key.match(/^[\w]$/) && this.search) {
      // If a search term is entered, move the focus to the search field.
      this.search.focus();
    }
  }
}
