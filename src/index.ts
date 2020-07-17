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

import {
  CLASS_PICKER,
  CLASS_PICKER_CONTENT,
  CLASS_EMOJI,
  CLASS_SEARCH_FIELD,
  CLASS_VARIANT_OVERLAY,
  CLASS_WRAPPER,
  CLASS_OVERLAY,
  CLASS_CUSTOM_EMOJI
} from './classes';

import { EmojiButtonOptions, I18NStrings, EmojiRecord } from './types';
import { EmojiArea } from './emojiArea';

const twemojiOptions = {
  ext: '.svg',
  folder: 'svg'
};

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
  emojiSize: '1.8em',
  initialCategory: 'smileys'
};

export class EmojiButton {
  pickerVisible: boolean;

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

  private overlay: HTMLElement;

  private popper: Popper;

  private observer: IntersectionObserver;

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

    this.buildPicker();
  }

  on(event: string, callback: (arg: string) => void): void {
    this.publicEvents.on(event, callback);
  }

  off(event: string, callback: (arg: string) => void): void {
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
      initialFocus:
        this.options.showSearch && this.options.autoFocusSearch
          ? '.emoji-picker__search'
          : '.emoji-picker__emoji[tabindex="0"]'
    });

    this.pickerContent = createElement('div', CLASS_PICKER_CONTENT);

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

    this.pickerEl.appendChild(this.pickerContent);

    this.emojiArea = new EmojiArea(this.events, this.i18n, this.options);
    this.pickerContent.appendChild(this.emojiArea.render());

    this.events.on(SHOW_SEARCH_RESULTS, (searchResults: HTMLElement) => {
      empty(this.pickerContent);
      searchResults.classList.add('search-results');
      this.pickerContent.appendChild(searchResults);
    });

    this.events.on(HIDE_SEARCH_RESULTS, () => {
      if (this.pickerContent.firstChild !== this.emojiArea.container) {
        empty(this.pickerContent);
        this.pickerContent.appendChild(this.emojiArea.container);
      }

      this.emojiArea.reset();
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
          this.showVariantPopup(emoji as EmojiRecord);
        } else {
          if (variantPopup && variantPopup.parentNode === this.pickerEl) {
            this.events.emit(HIDE_VARIANT_POPUP);
          }

          setTimeout(() => this.emojiArea.updateRecents());

          if (emoji.custom) {
            this.publicEvents.emit(
              EMOJI,
              `<img class="emoji" src="${emoji.emoji}">`
            );
          } else if (this.options.style === 'twemoji') {
            this.publicEvents.emit(
              EMOJI,
              twemoji.parse(emoji.emoji, twemojiOptions)
            );
          } else {
            this.publicEvents.emit(EMOJI, emoji.emoji);
          }
          if (this.options.autoHide) {
            this.hidePicker();
          }
        }
      }
    );

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

  private showVariantPopup(emoji: EmojiRecord) {
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

  private observeForLazyLoad() {
    const onChange = changes => {
      const visibleElements = Array.prototype.filter
        .call(changes, change => {
          return change.intersectionRatio > 0;
        })
        .map(entry => entry.target);

      visibleElements.forEach(element => {
        if (!element.dataset.loaded) {
          if (element.dataset.custom) {
            const img = createElement(
              'img',
              CLASS_CUSTOM_EMOJI
            ) as HTMLImageElement;
            img.src = element.dataset.emoji;
            element.innerText = '';
            element.appendChild(img);
            element.dataset.loaded = true;
            element.style.opacity = 1;
          } else if (this.options.style === 'twemoji') {
            element.innerHTML = twemoji.parse(
              element.dataset.emoji,
              twemojiOptions
            );
            element.dataset.loaded = true;
            element.style.opacity = '1';
          }
        }
      });
    };

    this.observer = new IntersectionObserver(onChange, {
      root: this.emojiArea.emojis
    });

    const emojiElements = this.emojiArea.emojis.querySelectorAll(
      `.${CLASS_EMOJI}`
    );

    emojiElements.forEach(element => {
      if (
        this.options.style === 'twemoji' ||
        (element as HTMLElement).dataset.custom === 'true'
      ) {
        this.observer.observe(element);
      }
    });
  }

  private onDocumentClick(event: MouseEvent): void {
    if (!this.pickerEl.contains(event.target as Node)) {
      this.hidePicker();
    }
  }

  destroyPicker(): void {
    this.events.off(EMOJI);
    this.events.off(HIDE_VARIANT_POPUP);

    if (this.options.rootElement) {
      this.options.rootElement.removeChild(this.wrapper);

      this.popper && this.popper.destroy();
    }

    this.observer && this.observer.disconnect();
  }

  hidePicker(): void {
    this.hideInProgress = true;
    this.focusTrap.deactivate();
    this.pickerVisible = false;

    if (this.overlay) {
      document.body.removeChild(this.overlay);
    }

    this.pickerEl.classList.add('hiding');
    setTimeout(() => {
      this.wrapper.style.display = 'none';
      this.pickerEl.classList.remove('hiding');

      if (this.pickerContent.firstChild !== this.emojiArea.container) {
        empty(this.pickerContent);
        this.pickerContent.appendChild(this.emojiArea.container);
      }

      const searchField = this.pickerEl.querySelector(
        `.${CLASS_SEARCH_FIELD}`
      ) as HTMLInputElement;
      if (searchField) {
        searchField.value = '';
      }

      const variantOverlay = this.pickerEl.querySelector(
        `.${CLASS_VARIANT_OVERLAY}`
      );
      if (variantOverlay) {
        this.events.emit(HIDE_VARIANT_POPUP);
      }

      this.hideInProgress = false;
    }, 170);

    setTimeout(() => {
      document.removeEventListener('click', this.onDocumentClick);
      document.removeEventListener('keydown', this.onDocumentKeydown);
    });
  }

  showPicker(referenceEl: HTMLElement, options: EmojiButtonOptions = {}): void {
    if (this.hideInProgress) {
      setTimeout(() => this.showPicker(referenceEl, options), 100);
      return;
    }

    this.pickerVisible = true;
    this.wrapper.style.display = 'block';

    if (window.matchMedia('screen and (max-width: 450px)').matches) {
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
    } else {
      this.popper = createPopper(referenceEl, this.wrapper, {
        placement: options.position || this.options.position
      });
    }

    this.focusTrap.activate();

    const initialFocusElement = this.pickerEl.querySelector(
      this.options.showSearch && this.options.autoFocusSearch
        ? `.${CLASS_SEARCH_FIELD}`
        : `.${CLASS_EMOJI}[tabindex="0"]`
    ) as HTMLElement;
    initialFocusElement.focus();

    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onDocumentKeydown);
    });

    this.emojiArea.reset();
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
        `.${CLASS_SEARCH_FIELD}`
      ) as HTMLInputElement;
      searchField && searchField.focus();
    }
  }
}
