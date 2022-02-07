import classes, { applyTheme } from './styles';

import createFocusTrap, { FocusTrap } from 'focus-trap';
import { TinyEmitter as Emitter } from 'tiny-emitter';
import { createPopper, Instance as Popper, Placement } from '@popperjs/core';
import twemoji from 'twemoji';

import emojiData from './data/emoji';

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

import { EmojiButtonOptions, EmojiRecord, EmojiSelection, FixedPosition, Theme } from './types';
import { EmojiArea } from './emojiArea';
import { save } from './recent';

import { renderTemplate } from './templates';
import template from './templates/index.ejs';

import lightTheme from './styles/theme/light';
import en from './i18n/lang-en';
import NativeRenderer from './renderers/native';

const MOBILE_BREAKPOINT = 450;

const DEFAULT_OPTIONS: Partial<EmojiButtonOptions> = {
  locale: en,
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
  theme: lightTheme,
  categories: ['smileys', 'people', 'animals', 'food', 'activities', 'travel', 'objects', 'symbols', 'flags'],
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

//  options as { base: string; size: string; ext: string };

type TwemojiCallbackOptions = {
  base: string;
  size: string;
  ext: string;
};

export { LazyLoader };

const SHOW_HIDE_DURATION = 200;

export class EmojiButton {
  private pickerVisible: boolean;

  private events = new Emitter();
  private publicEvents = new Emitter();
  private options: EmojiButtonOptions;
  private i18n: Bundle;

  private pickerEl: HTMLElement;
  private pickerContent: HTMLElement;
  private wrapper: HTMLElement;
  private pluginContainer: HTMLElement;
  private focusTrap: FocusTrap;

  private emojiArea: EmojiArea;
  private search: Search;

  private overlay?: HTMLElement;
  private rootElement: HTMLElement;
  private referenceElement: HTMLElement;

  private popper: Popper;

  private emojiCategories: { [key: string]: EmojiRecord[] };

  constructor(options: Partial<EmojiButtonOptions> = {}) {
    this.pickerVisible = false;

    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.rootElement = this.options.rootElement || document.body;
    this.i18n = new Bundle(this.options.locale);
    this.referenceElement = this.options.referenceElement;

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);

    this.emojiCategories = buildEmojiCategoryData(this.options.emojiData || emojiData);

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
    if (!this.options.showAnimation) {
      // TODO remove this
      this.pickerEl.style.setProperty('--animation-duration', '0s');
    }

    this.options.emojisPerRow &&
      this.pickerEl.style.setProperty('--emoji-per-row', this.options.emojisPerRow.toString());

    this.options.rows && this.pickerEl.style.setProperty('--row-count', this.options.rows.toString());

    this.options.emojiSize && this.pickerEl.style.setProperty('--emoji-size', this.options.emojiSize);

    if (!this.options.showCategoryButtons) {
      this.pickerEl.style.setProperty('--category-button-height', '0');
    }

    if (this.options.styleProperties) {
      Object.keys(this.options.styleProperties).forEach(key => {
        if (this.options.styleProperties) {
          this.pickerEl.style.setProperty(key, this.options.styleProperties[key]);
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
    this.pickerContent.replaceChildren(searchResults);
  }

  /**
   * Hides the search results and resets the picker.
   */
  private hideSearchResults(): void {
    if (this.pickerContent.firstChild !== this.emojiArea.container) {
      this.pickerContent.replaceChildren();
      this.pickerContent.appendChild(this.emojiArea.container);
    }

    this.search.reset();
    // this.emojiArea.reset();
  }

  /**
   * Emits a selected emoji event.
   * @param param0 The selected emoji and show variants flag
   */
  private async emitEmoji({ emoji, showVariants }: { emoji: EmojiRecord; showVariants: boolean }): Promise<void> {
    if ((emoji as EmojiRecord).variations && showVariants && this.options.showVariants) {
      this.showVariantPopup(emoji as EmojiRecord);
    } else {
      let eventData: EmojiSelection;
      if (emoji.custom) {
        eventData = this.emitCustomEmoji(emoji);
      } else {
        const content = await this.options.renderer?.render(emoji);
        eventData = {
          content,
          emoji
        };
      }
      // } else if (this.options.style === STYLE_TWEMOJI) {
      //   eventData = await this.emitTwemoji(emoji);
      // } else {
      //   eventData = this.emitNativeEmoji(emoji);
      // }

      this.publicEvents.emit(EMOJI, eventData);

      if (this.options.autoHide) {
        this.hidePicker();
      }

      if (
        (!(emoji as EmojiRecord).variations || !showVariants || !this.options.showVariants) &&
        this.options.showRecents
      ) {
        save(emoji, this.options, this.events);
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
        className: classes.twemoji,
        callback: (icon, options) => {
          const { base, size, ext } = options as TwemojiCallbackOptions;
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
    }
  }

  /**
   * Builds the emoji preview area.
   */
  private buildPreview(): void {
    if (this.options.showPreview) {
      this.pickerEl.appendChild(new EmojiPreview(this.events, this.options).render());
    }
  }

  /**
   * Initializes any plugins that were specified.
   */
  private initPlugins(): void {
    if (this.options.plugins) {
      this.pluginContainer = renderTemplate('<div class="<%= classes.pluginContainer %>"></div>');

      this.options.plugins.forEach(plugin => {
        if (!plugin.render) {
          throw new Error('Emoji Button plugins must have a "render" function.');
        }
        this.pluginContainer.appendChild(plugin.render(this));
      });
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
          ? `.${classes.searchField}`
          : `.${classes.emoji}[tabindex="0"]`
    });
  }

  /**
   * Builds the emoji picker.
   */
  private async buildPicker(): Promise<void> {
    this.initPlugins();
    this.buildSearch();

    const lazyLoader = new LazyLoader();

    this.emojiArea = new EmojiArea(this.events, this.i18n, this.options, this.emojiCategories, lazyLoader);

    this.wrapper = renderTemplate(template, {
      plugins: this.pluginContainer,
      search: this.search?.render(),
      emojiArea: await this.emojiArea.render()
    });

    this.pickerEl = this.wrapper.firstElementChild as HTMLElement;
    this.pickerEl.classList.add(applyTheme(this.options.theme));

    this.setStyleProperties();
    this.initFocusTrap();

    this.pickerContent = queryByClass(this.pickerEl, classes.content);

    this.events.on(SHOW_SEARCH_RESULTS, this.showSearchResults.bind(this));
    this.events.on(HIDE_SEARCH_RESULTS, this.hideSearchResults.bind(this));
    this.events.on(EMOJI, this.emitEmoji.bind(this));

    this.buildPreview();

    if (this.options.zIndex) {
      this.wrapper.style.zIndex = this.options.zIndex + '';
    }

    lazyLoader.observe(this.emojiArea.emojis);
  }

  /**
   * Shows the variant popup for an emoji.
   *
   * @param emoji The emoji whose variants are to be shown.
   */
  private async showVariantPopup(emoji: EmojiRecord): void {
    const variantPopup = await new VariantPopup(this.events, emoji, this.options).render();

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

    if (this.options.plugins) {
      this.options.plugins.forEach(plugin => {
        plugin.destroy && plugin.destroy();
      });
    }
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
    this.emojiArea.emojis.removeEventListener('scroll', this.emojiArea.highlightCategory);

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
    // this.pickerEl.classList.add('hiding');

    // Let the transition finish before actually hiding the picker so that
    // the user sees the hide animation.
    // setTimeout(
    // () => {
    // this.wrapper.style.display = 'none';
    // this.pickerEl.classList.remove('hiding');

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

    this.popper && this.popper.destroy();

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

    this.emojiArea.reset();
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
    if (typeof this.options.position === 'string') {
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
    const initialFocusElement = this.pickerEl.querySelector(
      this.options.showSearch && this.options.autoFocusSearch
        ? `.${classes.searchField}`
        : `.${classes.emoji}[tabindex="0"]`
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
  private setRelativePosition(): void {
    if (!this.referenceElement) {
      throw new Error('Reference element is required for relative positioning');
    }

    this.popper = createPopper(this.referenceElement, this.wrapper, {
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
