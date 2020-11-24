import '../css/emoji-button.css';

import createFocusTrap, { FocusTrap } from 'focus-trap';
import { TinyEmitter as Emitter } from 'tiny-emitter';
import { createPopper, Instance as Popper, Placement } from '@popperjs/core';
import twemoji from 'twemoji';

import emojiData from './data/emoji';

import {
  EMOJI,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
  HIDE_VARIANT_POPUP,
  PICKER_HIDDEN
} from './events';
import { lazyLoadEmoji } from './lazyLoad';
import { EmojiPreview } from './preview';
import { Search } from './search';
import { createElement, empty, buildEmojiCategoryData } from './util';
import { VariantPopup } from './variantPopup';

import { i18n } from './i18n';

import {
  CLASS_PICKER,
  CLASS_PICKER_CONTENT,
  CLASS_EMOJI,
  CLASS_SEARCH_FIELD,
  CLASS_WRAPPER,
  CLASS_OVERLAY,
  CLASS_PLUGIN_CONTAINER
} from './classes';

import {
  EmojiButtonOptions,
  I18NStrings,
  EmojiRecord,
  EmojiSelection,
  EmojiTheme,
  FixedPosition
} from './types';
import { EmojiArea } from './emojiArea';

const MOBILE_BREAKPOINT = 450;

const STYLE_TWEMOJI = 'twemoji';

const DEFAULT_OPTIONS: EmojiButtonOptions = {
  position: 'auto',
  autoHide: true,
  autoFocusSearch: true,
  showAnimation: true,
  showPreview: true,
  showSearch: true,
  showRecents: true,
  showVariants: true,
  showCategoryButtons: true,
  recentsCount: 50,
  emojiData,
  emojiVersion: '12.1',
  theme: 'light',
  categories: [
    'smileys',
    'people',
    'animals',
    'food',
    'activities',
    'travel',
    'objects',
    'symbols',
    'flags'
  ],
  style: 'native',
  twemojiOptions: {
    ext: '.svg',
    folder: 'svg'
  },
  emojisPerRow: 8,
  rows: 6,
  emojiSize: '1.8em',
  initialCategory: 'smileys'
};

export class EmojiButton {
  private pickerVisible: boolean;

  private hideInProgress: boolean;

  private events = new Emitter();
  private publicEvents = new Emitter();
  private options: EmojiButtonOptions;
  private i18n: I18NStrings;

  private pickerEl: HTMLElement;
  private pickerContent: HTMLElement;
  private wrapper: HTMLElement;
  private focusTrap: FocusTrap;

  private emojiArea: EmojiArea;
  private search: Search;

  private overlay?: HTMLElement;

  private popper: Popper;

  private observer: IntersectionObserver;

  private theme: EmojiTheme;

  private emojiCategories: { [key: string]: EmojiRecord[] };

  constructor(options: EmojiButtonOptions = {}) {
    this.pickerVisible = false;

    this.options = { ...DEFAULT_OPTIONS, ...options };
    if (!this.options.rootElement) {
      this.options.rootElement = document.body;
    }

    this.i18n = {
      ...i18n,
      ...options.i18n
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);

    this.theme = this.options.theme || 'light';

    this.emojiCategories = buildEmojiCategoryData(
      this.options.emojiData || emojiData
    );

    this.buildPicker();
  }

  /**
   * Adds an event listener to the picker.
   *
   * @param event The name of the event to listen for
   * @param callback The function to call when the event is fired
   */
  on(event: string, callback: (arg?: any) => void): void {
    this.publicEvents.on(event, callback);
  }

  /**
   * Removes an event listener from the picker.
   *
   * @param event The name of the event
   * @param callback The callback to remove
   */
  off(event: string, callback: (arg?: any) => void): void {
    this.publicEvents.off(event, callback);
  }

  /**
   * Sets any CSS variable values that need to be set.
   */
  private setStyleProperties(): void {
    if (!this.options.showAnimation) {
      this.pickerEl.style.setProperty('--animation-duration', '0s');
    }

    this.options.emojisPerRow &&
      this.pickerEl.style.setProperty(
        '--emoji-per-row',
        this.options.emojisPerRow.toString()
      );

    this.options.rows &&
      this.pickerEl.style.setProperty(
        '--row-count',
        this.options.rows.toString()
      );

    this.options.emojiSize &&
      this.pickerEl.style.setProperty('--emoji-size', this.options.emojiSize);

    if (!this.options.showCategoryButtons) {
      this.pickerEl.style.setProperty('--category-button-height', '0');
    }

    if (this.options.styleProperties) {
      Object.keys(this.options.styleProperties).forEach(key => {
        if (this.options.styleProperties) {
          this.pickerEl.style.setProperty(
            key,
            this.options.styleProperties[key]
          );
        }
      });
    }
  }

  /**
   * Shows the search results in the main emoji area.
   *
   * @param searchResults The element containing the search results.
   */
  private showSearchResults(searchResults: HTMLElement): void {
    empty(this.pickerContent);
    searchResults.classList.add('search-results');
    this.pickerContent.appendChild(searchResults);
  }

  /**
   * Hides the search results and resets the picker.
   */
  private hideSearchResults(): void {
    if (this.pickerContent.firstChild !== this.emojiArea.container) {
      empty(this.pickerContent);
      this.pickerContent.appendChild(this.emojiArea.container);
    }

    this.emojiArea.reset();
  }

  /**
   * Emits a selected emoji event.
   * @param param0 The selected emoji and show variants flag
   */
  private async emitEmoji({
    emoji,
    showVariants
  }: {
    emoji: EmojiRecord;
    showVariants: boolean;
  }): Promise<void> {
    if (
      (emoji as EmojiRecord).variations &&
      showVariants &&
      this.options.showVariants
    ) {
      this.showVariantPopup(emoji as EmojiRecord);
    } else {
      setTimeout(() => this.emojiArea.updateRecents());

      let eventData: EmojiSelection;
      if (emoji.custom) {
        eventData = this.emitCustomEmoji(emoji);
      } else if (this.options.style === STYLE_TWEMOJI) {
        eventData = await this.emitTwemoji(emoji);
      } else {
        eventData = this.emitNativeEmoji(emoji);
      }

      this.publicEvents.emit(EMOJI, eventData);

      if (this.options.autoHide) {
        this.hidePicker();
      }
    }
  }

  /**
   * Emits a native emoji record.
   * @param emoji The selected emoji
   */
  private emitNativeEmoji(emoji: EmojiRecord): EmojiSelection {
    return {
      emoji: emoji.emoji,
      name: emoji.name
    };
  }

  /**
   * Emits a custom emoji record.
   * @param emoji The selected emoji
   */
  private emitCustomEmoji(emoji: EmojiRecord): EmojiSelection {
    return {
      url: emoji.emoji,
      name: emoji.name,
      custom: true
    };
  }

  /**
   * Emits a Twemoji emoji record.
   * @param emoji The selected emoji
   */
  private emitTwemoji(emoji: EmojiRecord): Promise<EmojiSelection> {
    return new Promise(resolve => {
      twemoji.parse(emoji.emoji, {
        ...this.options.twemojiOptions,
        callback: (icon, { base, size, ext }: any) => {
          const imageUrl = `${base}${size}/${icon}${ext}`;
          resolve({
            url: imageUrl,
            emoji: emoji.emoji,
            name: emoji.name
          });

          return imageUrl;
        }
      });
    });
  }

  /**
   * Builds the search UI.
   */
  private buildSearch(): void {
    if (this.options.showSearch) {
      this.search = new Search(
        this.events,
        this.i18n,
        this.options,
        this.options.emojiData?.emoji || emojiData.emoji,
        (this.options.categories || []).map(category =>
          (this.options.emojiData || emojiData).categories.indexOf(category)
        )
      );

      this.pickerEl.appendChild(this.search.render());
    }
  }

  /**
   * Builds the emoji preview area.
   */
  private buildPreview(): void {
    if (this.options.showPreview) {
      this.pickerEl.appendChild(
        new EmojiPreview(this.events, this.options).render()
      );
    }
  }

  /**
   * Initializes any plugins that were specified.
   */
  private initPlugins(): void {
    if (this.options.plugins) {
      const pluginContainer = createElement('div', CLASS_PLUGIN_CONTAINER);

      this.options.plugins.forEach(plugin => {
        if (!plugin.render) {
          throw new Error(
            'Emoji Button plugins must have a "render" function.'
          );
        }
        pluginContainer.appendChild(plugin.render(this));
      });

      this.pickerEl.appendChild(pluginContainer);
    }
  }

  /**
   * Initializes the emoji picker's focus trap.
   */
  private initFocusTrap(): void {
    this.focusTrap = createFocusTrap(this.pickerEl as HTMLElement, {
      clickOutsideDeactivates: true,
      initialFocus:
        this.options.showSearch && this.options.autoFocusSearch
          ? '.emoji-picker__search'
          : '.emoji-picker__emoji[tabindex="0"]'
    });
  }

  /**
   * Builds the emoji picker.
   */
  private buildPicker(): void {
    this.pickerEl = createElement('div', CLASS_PICKER);
    this.pickerEl.classList.add(this.theme);

    this.setStyleProperties();
    this.initFocusTrap();

    this.pickerContent = createElement('div', CLASS_PICKER_CONTENT);

    this.initPlugins();
    this.buildSearch();

    this.pickerEl.appendChild(this.pickerContent);

    this.emojiArea = new EmojiArea(
      this.events,
      this.i18n,
      this.options,
      this.emojiCategories
    );
    this.pickerContent.appendChild(this.emojiArea.render());

    this.events.on(SHOW_SEARCH_RESULTS, this.showSearchResults.bind(this));
    this.events.on(HIDE_SEARCH_RESULTS, this.hideSearchResults.bind(this));
    this.events.on(EMOJI, this.emitEmoji.bind(this));

    this.buildPreview();

    this.wrapper = createElement('div', CLASS_WRAPPER);
    this.wrapper.appendChild(this.pickerEl);
    this.wrapper.style.display = 'none';

    if (this.options.zIndex) {
      this.wrapper.style.zIndex = this.options.zIndex + '';
    }

    if (this.options.rootElement) {
      this.options.rootElement.appendChild(this.wrapper);
    }

    this.observeForLazyLoad();
  }

  /**
   * Shows the variant popup for an emoji.
   *
   * @param emoji The emoji whose variants are to be shown.
   */
  private showVariantPopup(emoji: EmojiRecord): void {
    const variantPopup = new VariantPopup(
      this.events,
      emoji,
      this.options
    ).render();

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
   * Initializes the IntersectionObserver for lazy loading emoji images
   * as they are scrolled into view.
   */
  private observeForLazyLoad(): void {
    this.observer = new IntersectionObserver(
      this.handleIntersectionChange.bind(this),
      {
        root: this.emojiArea.emojis
      }
    );

    this.emojiArea.emojis
      .querySelectorAll(`.${CLASS_EMOJI}`)
      .forEach((element: Element) => {
        if (this.shouldLazyLoad(element as HTMLElement)) {
          this.observer.observe(element);
        }
      });
  }

  /**
   * IntersectionObserver callback that triggers lazy loading of emojis
   * that need it.
   *
   * @param entries The entries observed by the IntersectionObserver.
   */
  private handleIntersectionChange(entries: IntersectionObserverEntry[]): void {
    Array.prototype.filter
      .call(
        entries,
        (entry: IntersectionObserverEntry) => entry.intersectionRatio > 0
      )
      .map((entry: IntersectionObserverEntry) => entry.target)
      .forEach((element: Element) => {
        lazyLoadEmoji(element as HTMLElement, this.options);
      });
  }

  /**
   * Determines whether or not an emoji should be lazily loaded.
   *
   * @param element The element containing the emoji.
   * @return true if the emoji should be lazily loaded, false if not.
   */
  private shouldLazyLoad(element: HTMLElement): boolean {
    return (
      this.options.style === STYLE_TWEMOJI || element.dataset.custom === 'true'
    );
  }

  /**
   * Handles a click on the document, so that the picker is hidden
   * if the mouse is clicked outside of it.
   *
   * @param event The MouseEvent that was dispatched.
   */
  private onDocumentClick(event: MouseEvent): void {
    if (!this.pickerEl.contains(event.target as Node)) {
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

    if (this.options.rootElement) {
      this.options.rootElement.removeChild(this.wrapper);

      this.popper && this.popper.destroy();
    }

    this.observer && this.observer.disconnect();

    if (this.options.plugins) {
      this.options.plugins.forEach(plugin => {
        plugin.destroy && plugin.destroy();
      });
    }
  }

  /**
   * Hides, but does not destroy, the picker.
   */
  hidePicker(): void {
    this.hideInProgress = true;
    this.focusTrap.deactivate();
    this.pickerVisible = false;

    if (this.overlay) {
      document.body.removeChild(this.overlay);
      this.overlay = undefined;
    }

    // In some browsers, the delayed hide was triggering the scroll event handler
    // and stealing the focus. Remove the scroll listener before doing the delayed hide.
    this.emojiArea.emojis.removeEventListener(
      'scroll',
      this.emojiArea.highlightCategory
    );

    this.pickerEl.classList.add('hiding');

    // Let the transition finish before actually hiding the picker so that
    // the user sees the hide animation.
    setTimeout(
      () => {
        this.wrapper.style.display = 'none';
        this.pickerEl.classList.remove('hiding');

        if (this.pickerContent.firstChild !== this.emojiArea.container) {
          empty(this.pickerContent);
          this.pickerContent.appendChild(this.emojiArea.container);
        }

        if (this.search) {
          this.search.clear();
        }

        this.events.emit(HIDE_VARIANT_POPUP);

        this.hideInProgress = false;
        this.popper && this.popper.destroy();

        this.publicEvents.emit(PICKER_HIDDEN);
      },
      this.options.showAnimation ? 170 : 0
    );

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
  showPicker(referenceEl: HTMLElement): void {
    if (this.hideInProgress) {
      setTimeout(() => this.showPicker(referenceEl), 100);
      return;
    }

    this.pickerVisible = true;
    this.wrapper.style.display = 'block';

    this.determineDisplay(referenceEl);

    this.focusTrap.activate();

    setTimeout(() => {
      this.addEventListeners();
      this.setInitialFocus();
    });

    this.emojiArea.reset();
  }

  /**
   * Determines which display and position are used for the picker, based on
   * the viewport size and specified options.
   *
   * @param referenceEl The element to position relative to if relative positioning is used.
   */
  determineDisplay(referenceEl: HTMLElement): void {
    if (
      window.matchMedia(`screen and (max-width: ${MOBILE_BREAKPOINT}px)`)
        .matches
    ) {
      this.showMobileView();
    } else if (typeof this.options.position === 'string') {
      this.setRelativePosition(referenceEl);
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
    const initialFocusElement = this.pickerEl.querySelector(
      this.options.showSearch && this.options.autoFocusSearch
        ? `.${CLASS_SEARCH_FIELD}`
        : `.${CLASS_EMOJI}[tabindex="0"]`
    ) as HTMLElement;
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
  private setRelativePosition(referenceEl: HTMLElement): void {
    this.popper = createPopper(referenceEl, this.wrapper, {
      placement: this.options.position as Placement
    });
  }

  /**
   * Sets fixed positioning.
   */
  private setFixedPosition(): void {
    if (this.options?.position) {
      this.wrapper.style.position = 'fixed';

      const fixedPosition = this.options.position as FixedPosition;

      Object.keys(fixedPosition).forEach(key => {
        this.wrapper.style[key] = fixedPosition[key];
      });
    }
  }

  /**
   * Shows the picker in a mobile view.
   */
  private showMobileView(): void {
    const style = window.getComputedStyle(this.pickerEl);
    const htmlEl = document.querySelector('html');
    const viewportHeight = htmlEl && htmlEl.clientHeight;
    const viewportWidth = htmlEl && htmlEl.clientWidth;

    const height = parseInt(style.height);
    const newTop = viewportHeight ? viewportHeight / 2 - height / 2 : 0;

    const width = parseInt(style.width);
    const newLeft = viewportWidth ? viewportWidth / 2 - width / 2 : 0;

    this.wrapper.style.position = 'fixed';
    this.wrapper.style.top = `${newTop}px`;
    this.wrapper.style.left = `${newLeft}px`;
    this.wrapper.style.zIndex = '5000';

    this.overlay = createElement('div', CLASS_OVERLAY);
    document.body.appendChild(this.overlay);
  }

  /**
   * Toggles the picker's visibility.
   *
   * @param referenceEl The element to position relative to if relative positioning is used.
   */
  togglePicker(referenceEl: HTMLElement): void {
    this.pickerVisible ? this.hidePicker() : this.showPicker(referenceEl);
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

  /**
   * Sets the theme to use for the picker.
   */
  setTheme(theme: EmojiTheme): void {
    if (theme !== this.theme) {
      this.pickerEl.classList.remove(this.theme);
      this.theme = theme;
      this.pickerEl.classList.add(theme);
    }
  }
}
