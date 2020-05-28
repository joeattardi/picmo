import '../css/emoji-button.css';

import createFocusTrap, { FocusTrap } from 'focus-trap';
import { TinyEmitter as Emitter } from 'tiny-emitter';
import { createPopper, Instance as Popper } from '@popperjs/core';
import twemoji from 'twemoji';

import emojiData from './data/emoji';

import {
  EMOJI,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
  HIDE_VARIANT_POPUP
} from './events';
import { EmojiPreview } from './preview';
import { Search } from './search';
import { createElement, empty } from './util';
import { VariantPopup } from './variantPopup';

import { i18n } from './i18n';

import { EmojiButtonOptions, I18NStrings, EmojiRecord } from './types';
import { EmojiArea } from './emojiArea';

const CLASS_PICKER = 'emoji-picker';
const CLASS_PICKER_CONTENT = 'emoji-picker__content';

const DEFAULT_OPTIONS: EmojiButtonOptions = {
  position: 'right-start',
  autoHide: true,
  autoFocusSearch: true,
  showPreview: true,
  showSearch: true,
  showRecents: true,
  showVariants: true,
  showCategoryButtons: true,
  recentsCount: 50,
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
  emojisPerRow: 8,
  rows: 6,
  emojiSize: '1.8em'
};

export default class EmojiButton {
  pickerVisible: boolean;

  private events = new Emitter();
  private publicEvents = new Emitter();
  private options: EmojiButtonOptions;
  private i18n: I18NStrings;

  private pickerEl: HTMLElement;
  private wrapper: HTMLElement;
  private focusTrap: FocusTrap;

  private hideInProgress: boolean;
  private destroyTimeout: NodeJS.Timeout;

  private popper: Popper;

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
  }

  on(event: string, callback: Function): void {
    this.publicEvents.on(event, callback);
  }

  off(event: string, callback: Function): void {
    this.publicEvents.off(event, callback);
  }

  private buildPicker(): void {
    this.pickerEl = createElement('div', CLASS_PICKER);
    this.pickerEl.classList.add(this.options.theme as string);

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

    this.focusTrap = createFocusTrap(this.pickerEl as HTMLElement, {
      clickOutsideDeactivates: true,
      initialFocus: this.options.autoFocusSearch
        ? '.emoji-picker__search'
        : '.emoji-picker__emoji[tabindex="0"]'
    });

    const pickerContent = createElement('div', CLASS_PICKER_CONTENT);

    if (this.options.showSearch) {
      const searchContainer = new Search(
        this.events,
        this.i18n,
        this.options,
        emojiData.emoji,
        (this.options.categories || []).map(category =>
          emojiData.categories.indexOf(category)
        )
      ).render();
      this.pickerEl.appendChild(searchContainer);
    }

    this.pickerEl.appendChild(pickerContent);

    const emojiArea = new EmojiArea(
      this.events,
      this.i18n,
      this.options
    ).render();
    pickerContent.appendChild(emojiArea);

    this.events.on(SHOW_SEARCH_RESULTS, (searchResults: HTMLElement) => {
      empty(pickerContent);
      searchResults.classList.add('search-results');
      pickerContent.appendChild(searchResults);
    });

    this.events.on(HIDE_SEARCH_RESULTS, () => {
      if (pickerContent.firstChild !== emojiArea) {
        empty(pickerContent);
        pickerContent.appendChild(emojiArea);
      }
    });

    if (this.options.showPreview) {
      this.pickerEl.appendChild(
        new EmojiPreview(this.events, this.options).render()
      );
    }

    let variantPopup: HTMLElement | null;
    this.events.on(
      EMOJI,
      ({
        emoji,
        showVariants
      }: {
        emoji: EmojiRecord;
        showVariants: boolean;
      }) => {
        if (
          (emoji as EmojiRecord).variations &&
          showVariants &&
          this.options.showVariants
        ) {
          variantPopup = new VariantPopup(
            this.events,
            emoji as EmojiRecord,
            this.options
          ).render();

          if (variantPopup) {
            this.pickerEl.appendChild(variantPopup);
          }
        } else {
          if (variantPopup && variantPopup.parentNode === this.pickerEl) {
            this.pickerEl.removeChild(variantPopup);
          }

          if (this.options.style === 'twemoji') {
            this.publicEvents.emit('emoji', twemoji.parse(emoji.emoji));
          } else {
            this.publicEvents.emit('emoji', emoji.emoji);
          }
          if (this.options.autoHide) {
            this.hidePicker();
          }
        }
      }
    );

    this.events.on(HIDE_VARIANT_POPUP, () => {
      if (variantPopup) {
        variantPopup.classList.add('hiding');
        setTimeout(() => {
          variantPopup && this.pickerEl.removeChild(variantPopup);
          variantPopup = null;
        }, 175);
      }
    });

    this.wrapper = createElement('div', 'wrapper');
    this.wrapper.appendChild(this.pickerEl);

    if (this.options.zIndex) {
      this.wrapper.style.zIndex = this.options.zIndex + '';
    }

    if (this.options.rootElement) {
      this.options.rootElement.appendChild(this.wrapper);
    }

    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onDocumentKeydown);
    });
  }

  private onDocumentClick(event: MouseEvent): void {
    if (!this.pickerEl.contains(event.target as Node)) {
      this.hidePicker();
    }
  }

  private destroyPicker(): void {
    if (this.options.rootElement) {
      this.options.rootElement.removeChild(this.wrapper);
      this.popper.destroy();
      this.hideInProgress = false;
    }
  }

  hidePicker(): void {
    this.focusTrap.deactivate();
    this.pickerVisible = false;
    this.events.off(EMOJI);
    this.events.off(HIDE_VARIANT_POPUP);

    this.hideInProgress = true;
    this.pickerEl.classList.add('hiding');
    this.destroyTimeout = setTimeout(this.destroyPicker.bind(this), 170);

    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  showPicker(referenceEl: HTMLElement, options: EmojiButtonOptions = {}): void {
    if (this.hideInProgress) {
      clearTimeout(this.destroyTimeout);
      this.destroyPicker();
    }

    this.pickerVisible = true;
    this.buildPicker();
    this.popper = createPopper(referenceEl, this.wrapper, {
      placement: options.position || this.options.position
    });

    this.focusTrap.activate();
  }

  togglePicker(
    referenceEl: HTMLElement,
    options: EmojiButtonOptions = {}
  ): void {
    this.pickerVisible
      ? this.hidePicker()
      : this.showPicker(referenceEl, options);
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hidePicker();
    } else if (event.key === 'Tab') {
      this.pickerEl.classList.add('keyboard');
    } else if (event.key.match(/^[\w]$/)) {
      const searchField = this.pickerEl.querySelector(
        '.emoji-picker__search'
      ) as HTMLInputElement;
      searchField && searchField.focus();
    }
  }
}
