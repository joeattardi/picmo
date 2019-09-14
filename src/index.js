import '../css/emoji-button.css';

import Emitter from 'tiny-emitter';
import Popper from 'popper.js';

import { EMOJI, SHOW_SEARCH_RESULTS, SHOW_TABS, HIDE_TABS, HIDE_VARIANT_POPUP } from './events';
import { EmojiPreview } from './preview';
import { Search } from './search';
import { Tabs } from './tabs';
import { createElement, empty } from './util';
import { VariantPopup } from './variantPopup';

const CLASS_PICKER = 'emoji-picker';
const CLASS_PICKER_CONTENT = 'emoji-picker__content';

const DEFAULT_OPTIONS = {
  position: 'right-start'
};

export default class EmojiButton {
  constructor(options = {}) {
    this.pickerVisible = false;

    this.options = { ...DEFAULT_OPTIONS, ...options };

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

    const pickerContent = createElement('div', CLASS_PICKER_CONTENT);

    const searchContainer = new Search(this.events).render();
    this.pickerEl.appendChild(searchContainer);

    this.pickerEl.appendChild(pickerContent);
    
    const tabs = new Tabs(this.events).render();
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
      pickerContent.appendChild(searchResults);
    });

    this.pickerEl.appendChild(new EmojiPreview(this.events).render());

    let variantPopup;
    this.events.on(EMOJI, ({emoji, showVariants}) => {
      if (emoji.v && showVariants) {
        variantPopup = new VariantPopup(this.events, emoji).render();
        this.pickerEl.appendChild(variantPopup);
      } else {
        this.publicEvents.emit('emoji', emoji.e);
        this.hidePicker();
      }
    });

    this.events.on(HIDE_VARIANT_POPUP, () => {
      this.pickerEl.removeChild(variantPopup);
      variantPopup = null;
    });

    document.body.appendChild(this.pickerEl);

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

  hidePicker() {
    this.pickerVisible = false;
    this.events.off(EMOJI);
    this.events.off(HIDE_VARIANT_POPUP);
    document.body.removeChild(this.pickerEl);
    this.popper.destroy();
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  showPicker(referenceEl, options = {}) {
    this.pickerVisible = true;
    this.buildPicker();
    this.popper = new Popper(referenceEl, this.pickerEl, {
      placement: options.position || this.options.position
    });
  }

  onDocumentKeydown(event) {
    if (event.key === 'Escape') {
      this.hidePicker();
    }
  }
}
