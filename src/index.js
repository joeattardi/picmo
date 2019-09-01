import EventEmitter from 'eventemitter3';
import Popper from 'popper.js';

import { HIDE_PICKER, EMOJI, RENDER_TABS } from './events';
import * as icons from './icons';
import { renderSearch } from './search';
import { renderTabs } from './tabs';
import { createElement } from './util';

const CLASS_PICKER = 'emoji-picker';
const CLASS_PICKER_CONTENT = 'emoji-picker__content';

export default function emojiButton(button, callback) {
  let pickerVisible = false;
  let picker;
  let popper;

  const events = new EventEmitter();

  events.on(HIDE_PICKER, hidePicker);
  events.on(EMOJI, callback);

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

    events.on(RENDER_TABS, () => renderTabs(pickerContent, events));

    const searchContainer = renderSearch(pickerContent, events);
    picker.appendChild(searchContainer);

    picker.appendChild(pickerContent);
    renderTabs(pickerContent, events);

    document.body.appendChild(picker);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);

    popper = new Popper(button, picker, {
      placement: 'right-start'
    });
  }

  button.addEventListener('click', event => {
    pickerVisible = !pickerVisible;

    if (pickerVisible) {
      buildPicker();
    } else {
      hidePicker();
    }
  });
}
