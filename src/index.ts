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
  CLASS_CUSTOM_EMOJI,
  CLASS_PLUGIN_CONTAINER
} from './classes';

import {
  EmojiButtonOptions,
  I18NStrings,
  EmojiRecord,
  EmojiTheme
} from './types';
import { EmojiArea } from './emojiArea';

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

  private overlay?: HTMLElement;

  private popper: Popper;

  private observer: IntersectionObserver;

  private theme: EmojiTheme;

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
    this.updateTheme(this.theme);

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

    this.focusTrap = createFocusTrap(this.pickerEl as HTMLElement, {
      clickOutsideDeactivates: true,
      initialFocus:
        this.options.showSearch && this.options.autoFocusSearch
          ? '.emoji-picker__search'
          : '.emoji-picker__emoji[tabindex="0"]'
    });

    this.pickerContent = createElement('div', CLASS_PICKER_CONTENT);

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
            this.publicEvents.emit(EMOJI, {
              url: emoji.emoji,
              name: emoji.name,
              custom: true
            });
          } else if (this.options.style === 'twemoji') {
            twemoji.parse(emoji.emoji, {
              ...this.options.twemojiOptions,
              callback: (icon, { base, size, ext }: any) => {
                const imageUrl = `${base}${size}/${icon}${ext}`;
                this.publicEvents.emit(EMOJI, {
                  url: imageUrl,
                  emoji: emoji.emoji,
                  name: emoji.name
                });

                return imageUrl;
              }
            });
          } else {
            this.publicEvents.emit(EMOJI, {
              emoji: emoji.emoji,
              name: emoji.name
            });
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
              this.options.twemojiOptions
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

    if (this.options.plugins) {
      this.options.plugins.forEach(plugin => {
        plugin.destroy && plugin.destroy();
      });
    }
  }

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
    setTimeout(
      () => {
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

  showPicker(referenceEl: HTMLElement): void {
    if (this.hideInProgress) {
      setTimeout(() => this.showPicker(referenceEl), 100);
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
    } else if (typeof this.options.position === 'string') {
      this.popper = createPopper(referenceEl, this.wrapper, {
        placement: this.options.position as Placement
      });
    } else if (
      this.options.position &&
      (this.options.position.top || this.options.position.left)
    ) {
      this.wrapper.style.position = 'fixed';

      if (this.options.position.top) {
        this.wrapper.style.top = this.options.position.top;
      }

      if (this.options.position.bottom) {
        this.wrapper.style.bottom = this.options.position.bottom;
      }

      if (this.options.position.left) {
        this.wrapper.style.left = this.options.position.left;
      }

      if (this.options.position.right) {
        this.wrapper.style.right = this.options.position.right;
      }
    }

    this.focusTrap.activate();

    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onDocumentKeydown);

      const initialFocusElement = this.pickerEl.querySelector(
        this.options.showSearch && this.options.autoFocusSearch
          ? `.${CLASS_SEARCH_FIELD}`
          : `.${CLASS_EMOJI}[tabindex="0"]`
      ) as HTMLElement;
      initialFocusElement.focus();
    });

    this.emojiArea.reset();
  }

  togglePicker(referenceEl: HTMLElement): void {
    this.pickerVisible ? this.hidePicker() : this.showPicker(referenceEl);
  }

  isPickerVisible(): boolean {
    return this.pickerVisible;
  }

  private onDocumentKeydown(event: KeyboardEvent): void {
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

  setTheme(theme: EmojiTheme): void {
    if (theme === this.theme) return;

    this.pickerEl.classList.remove(this.theme);
    this.theme = theme;
    this.updateTheme(this.theme);
  }

  private updateTheme(theme: EmojiTheme): void {
    this.pickerEl.classList.add(theme);
  }
}
