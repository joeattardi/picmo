import classes from './picker.scss';

import createFocusTrap, { FocusTrap } from 'focus-trap';
import { TinyEmitter as Emitter } from 'tiny-emitter';
import { createPopper, Instance as Popper, Placement } from '@popperjs/core';

import emojiData from './data/emoji';

import { light } from './themes';

import {
  EventCallback,
  EMOJI,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
  HIDE_VARIANT_POPUP,
  PICKER_HIDDEN
} from './events';
import { LazyLoader } from './lazyLoad';
import { EmojiPreview } from './preview';
import { Search } from './search';
import { buildEmojiCategoryData, queryByClass } from './util';
import { VariantPopup } from './variantPopup';

import Bundle from './i18n';

// import { EmojiButtonOptions, EmojiRecord, EmojiSelection, FixedPosition, Theme } from './types';

import { PickerOptions, CustomEmoji, Position } from './types';

import { EmojiArea } from './emojiArea';
import { save } from './recent';

import { renderTemplate } from './templates';
import template from './templates/index.ejs';

import en from './i18n/lang-en';
import NativeRenderer from './renderers/native';
import Renderer from './renderers/renderer';
import { Theme } from './types_OLD';
import { EmojiContainer } from './emojiContainer';

const MOBILE_BREAKPOINT = 450;

const DEFAULT_OPTIONS = {
  locale: en,
  position: 'auto',
  autoHide: true,
  autoFocusSearch: true,
  showPreview: true,
  showSearch: true,
  showRecents: true,
  showVariants: true,
  showCategoryButtons: true,
  recentsCount: 50,
  emojiData,
  emojiVersion: '12.1',
  // theme: lightTheme,
  categories: ['smileys', 'people', 'animals', 'food', 'travel', 'activities', 'objects', 'symbols', 'flags'],
  style: 'native',
  twemojiOptions: {
    ext: '.svg',
    folder: 'svg'
  },
  emojisPerRow: 8,
  rows: 6,
  emojiSize: '1.8em',
  initialCategory: 'smileys',
  renderer: new NativeRenderer()
};

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

export class EmojiButton {
  private pickerVisible = false;

  private events = new Emitter();
  private publicEvents = new Emitter();
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

  private searchResults: EmojiContainer;

  private showCategoryButtons: boolean;
  private showSearch: boolean;
  private showVariants: boolean;
  private showRecents: boolean;
  private showPreview: boolean;

  private autoHide: boolean;
  private autoFocusSearch: boolean;

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

    this.buildPicker();
  }

  /**
   * Adds an event listener to the picker.
   *
   * @param event The name of the event to listen for
   * @param callback The function to call when the event is fired
   */
  on(event: string, callback: EventCallback): void {
    this.publicEvents.on(event, callback);
  }

  /**
   * Removes an event listener from the picker.
   *
   * @param event The name of the event
   * @param callback The callback to remove
   */
  off(event: string, callback: EventCallback): void {
    this.publicEvents.off(event, callback);
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
   * Shows the search results in the main emoji area.
   *
   * @param searchResults The element containing the search results.
   */
  private showSearchResults(searchResults: EmojiContainer): void {
    this.searchResults = searchResults;
    this.pickerContent.replaceChildren(searchResults.el);
  }

  /**
   * Hides the search results and resets the picker.
   */
  private hideSearchResults(): void {
    if (this.pickerContent.firstChild === this.searchResults?.el) {
      this.searchResults.destroy();
      this.pickerContent.replaceChildren();
      this.pickerContent.appendChild(this.emojiArea.el);
    }

    this.search.reset();
    // this.emojiArea.reset();
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

      this.publicEvents.emit(EMOJI, eventData);

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
      this.search = new Search({
        events: this.events,
        i18n: this.i18n,
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
      this.pickerEl.appendChild(
        await new EmojiPreview({
          events: this.events,
          renderer: this.renderer
        }).render()
      );
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

    this.emojiArea = new EmojiArea({
      events: this.events,
      i18n: this.i18n,
      emojiCategoryData: this.emojiCategories,
      lazyLoader: lazyLoader,
      emojisPerRow: this.emojisPerRow,
      custom: this.customEmojis,
      showCategoryButtons: this.showCategoryButtons,
      showRecents: this.showRecents,
      renderer: this.renderer,
      emojiVersion: this.emojiVersion
    });

    this.wrapper = renderTemplate(template, {
      classes,
      plugins: this.pluginContainer,
      search: await this.search?.render(),
      // emojiArea: document.createElement('div')
      emojiArea: await this.emojiArea.render()
    });

    this.pickerEl = this.wrapper.firstElementChild as HTMLElement;
    this.pickerEl.classList.add(this.theme);

    this.setStyleProperties();
    this.initFocusTrap();

    this.pickerContent = queryByClass(this.pickerEl, classes.content);

    this.events.on(SHOW_SEARCH_RESULTS, this.showSearchResults.bind(this));
    this.events.on(HIDE_SEARCH_RESULTS, this.hideSearchResults.bind(this));
    this.events.on(EMOJI, this.emitEmoji.bind(this));

    this.buildPreview();

    // TODO bring back z-index later
    // if (this.options.zIndex) {
    //   this.wrapper.style.zIndex = this.options.zIndex + '';
    // }

    lazyLoader.observe(this.emojiArea.ui.emojis);
  }

  /**
   * Shows the variant popup for an emoji.
   *
   * @param emoji The emoji whose variants are to be shown.
   */
  private async showVariantPopup(emoji: any): Promise<void> {
    const variantPopup = await new VariantPopup({
      events: this.events,
      emoji,
      renderer: this.renderer
    }).render();

    if (variantPopup) {
      this.pickerEl.appendChild(variantPopup);
    }

    this.events.on(HIDE_VARIANT_POPUP, () => {
      if (variantPopup) {
        variantPopup.classList.add('hiding');
        setTimeout(() => {
          variantPopup && this.pickerEl.removeChild(variantPopup);
        }, 175);
      }

      this.events.off(HIDE_VARIANT_POPUP);
    });
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
    this.events.off(EMOJI);
    this.events.off(HIDE_VARIANT_POPUP);

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

    // TODO fix this, search is broken!
    // if (this.pickerContent.firstChild !== this.emojiArea.container) {
    //   empty(this.pickerContent);
    //   this.pickerContent.appendChild(this.emojiArea.container);
    // }

    if (this.search) {
      this.search.clear();
      this.hideSearchResults();
    }

    this.events.emit(HIDE_VARIANT_POPUP);

    this.popper && this.popper?.destroy();

    this.publicEvents.emit(PICKER_HIDDEN);

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
