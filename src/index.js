import '../css/emoji-button.css';

import Emitter from 'tiny-emitter';
import { createPopper } from '@popperjs/core';

import emojiData from './data/emoji';

import {
  EMOJI,
  SHOW_SEARCH_RESULTS,
  SHOW_TABS,
  HIDE_TABS,
  HIDE_VARIANT_POPUP
} from './events';
import { EmojiPreview } from './preview';
import { Search } from './search';
import { Tabs } from './tabs';
import { createElement, empty } from './util';
import { VariantPopup } from './variantPopup';

import { i18n } from './i18n';

const CLASS_PICKER = 'emoji-picker';
const CLASS_PICKER_CONTENT = 'emoji-picker__content';

const DEFAULT_OPTIONS = {
  position: 'right-start',
  autoHide: true,
  autoFocusSearch: true,
  showPreview: true,
  showSearch: true,
  showRecents: true,
  showVariants: true,
  recentsCount: 50,
  emojiVersion: '12.1'
};

export default class EmojiButton {
  constructor(options = {}) {
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

    this.events = new Emitter();
    this.publicEvents = new Emitter();
  }

  on(event, callback) {
    this.publicEvents.on(event, callback);
  }

  off(event, callback) {
    this.publicEvents.off(event, callback);
  }

  buildPicker() {
    this.pickerEl = createElement('div', CLASS_PICKER);

    if (this.options.zIndex) {
      this.pickerEl.style.zIndex = this.options.zIndex;
    }

    const pickerContent = createElement('div', CLASS_PICKER_CONTENT);

    if (this.options.showSearch) {
      const searchContainer = new Search(
        this.events,
        this.i18n,
        this.options,
        emojiData,
        this.options.autoFocusSearch
      ).render();
      this.pickerEl.appendChild(searchContainer);
    }

    this.pickerEl.appendChild(pickerContent);

    const tabs = new Tabs(this.events, this.i18n, this.options).render();
    pickerContent.appendChild(tabs);

    this.events.on(HIDE_TABS, () => {
      if (pickerContent.contains(tabs)) {
        pickerContent.removeChild(tabs);
      }
    });

    this.events.on(SHOW_TABS, () => {
      if (!pickerContent.contains(tabs)) {
        empty(pickerContent);
        pickerContent.appendChild(tabs);
      }
    });

    this.events.on(SHOW_SEARCH_RESULTS, searchResults => {
      empty(pickerContent);
      searchResults.classList.add('search-results');
      pickerContent.appendChild(searchResults);
    });

    if (this.options.showPreview) {
      this.pickerEl.appendChild(new EmojiPreview(this.events).render());
    }

    let variantPopup;
    this.events.on(EMOJI, ({ emoji, showVariants }) => {
      if (emoji.v && showVariants && this.options.showVariants) {
        variantPopup = new VariantPopup(
          this.events,
          emoji,
          this.options
        ).render();
        this.pickerEl.appendChild(variantPopup);
      } else {
        if (variantPopup && variantPopup.parentNode === this.pickerEl) {
          this.pickerEl.removeChild(variantPopup);
        }
        this.publicEvents.emit('emoji', emoji.e);
        if (this.options.autoHide) {
          this.hidePicker();
        }
      }
    });

    this.events.on(HIDE_VARIANT_POPUP, () => {
      this.pickerEl.removeChild(variantPopup);
      variantPopup = null;
    });

    this.options.rootElement.appendChild(this.pickerEl);

    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onDocumentKeydown);
    });
  }

  onDocumentClick(event) {
    if (!this.pickerEl.contains(event.target)) {
      this.hidePicker();
    }
  }

  destroyPicker() {
    this.options.rootElement.removeChild(this.pickerEl);
    this.popper.destroy();
    this.pickerEl.style.transition = '';
    this.hideInProgress = false;
  }

  hidePicker() {
    this.pickerEl.classList.remove('visible');
    this.pickerVisible = false;
    this.events.off(EMOJI);
    this.events.off(HIDE_VARIANT_POPUP);

    this.hideInProgress = true;
    this.destroyTimeout = setTimeout(this.destroyPicker.bind(this), 500);

    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  showPicker(referenceEl, options = {}) {
    if (this.hideInProgress) {
      clearTimeout(this.destroyTimeout);
      this.destroyPicker();
    }

    this.pickerVisible = true;
    this.buildPicker();
    this.popper = createPopper(referenceEl, this.pickerEl, {
      placement: options.position || this.options.position
    });

    requestAnimationFrame(() => this.pickerEl.classList.add('visible'));
  }

  onDocumentKeydown(event) {
    if (event.key === 'Escape') {
      this.hidePicker();
    }
  }
}
