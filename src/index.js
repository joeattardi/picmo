import '../css/emoji-button.css';

import EventEmitter from 'eventemitter3';
import Popper from 'popper.js';

import { EMOJI, SHOW_SEARCH_RESULTS, SHOW_TABS, HIDE_TABS, HIDE_VARIANT_POPUP } from './events';
import * as icons from './icons';
import { renderPreview } from './preview';
import { renderSearch } from './search';
import { renderTabs } from './tabs';
import { createElement, empty } from './util';
import { renderVariantPopup } from './variantPopup';

const CLASS_PICKER = 'emoji-picker';
const CLASS_PICKER_CONTENT = 'emoji-picker__content';

export default function emojiButton(button, callback) {
  let pickerVisible = false;
  let picker;
  let popper;

  const events = new EventEmitter();

  button.innerHTML = icons.smile;

  function onDocumentClick(event) {
    let parent = event.target;
    while (parent) {
      if (parent === picker || parent === button) {
        return;
      }

      parent = parent.parentElement;
    }

    hidePicker();
  }

  function hidePicker() {
    pickerVisible = false;
    events.off(EMOJI);
    events.off(HIDE_VARIANT_POPUP);
    document.body.removeChild(picker);
    popper.destroy();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function onDocumentKeydown(event) {
    if (event.key === 'Escape') {
      hidePicker();
    }
  }

  function buildPicker() {
    picker = createElement('div', CLASS_PICKER);

    const pickerContent = createElement('div', CLASS_PICKER_CONTENT);

    const searchContainer = renderSearch(events);
    picker.appendChild(searchContainer);

    picker.appendChild(pickerContent);
    
    const tabs = renderTabs(events);
    pickerContent.appendChild(tabs);

    events.on(HIDE_TABS, () => {
      if (pickerContent.contains(tabs)) {
        pickerContent.removeChild(tabs);
      }
    });
  
    events.on(SHOW_TABS, () => {
      if (!pickerContent.contains(tabs)) {
        empty(pickerContent);
        pickerContent.appendChild(tabs);
      }
    });

    events.on(SHOW_SEARCH_RESULTS, searchResults => {
      empty(pickerContent);
      pickerContent.appendChild(searchResults);
    });

    picker.appendChild(renderPreview(events));

    let variantPopup;
    events.on(EMOJI, ({emoji, showVariants}) => {
      if (emoji.v && showVariants) {
        variantPopup = renderVariantPopup(events, emoji);
        picker.appendChild(variantPopup);
      } else {
        callback(emoji.e);
        hidePicker();
      }
    });

    events.on(HIDE_VARIANT_POPUP, () => {
      picker.removeChild(variantPopup);
      variantPopup = null;
    });

    document.body.appendChild(picker);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);

    popper = new Popper(button, picker, {
      placement: 'right-start'
    });
  }

  button.addEventListener('click', () => {
    pickerVisible = !pickerVisible;

    if (pickerVisible) {
      buildPicker();
    } else {
      hidePicker();
    }
  });
}
