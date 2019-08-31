import Popper from 'popper.js';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

import { renderTabs } from './tabs';
import { createElement } from './util';

library.add(faSmile);

const smile = icon({ prefix: 'far', iconName: 'smile' }).html;

const CLASS_PICKER = 'emoji-picker';
const CLASS_PICKER_CONTENT = 'emoji-picker__content';

export default function emojiButton(button, callback) {
  let pickerVisible = false;
  let picker;
  let popper;

  button.innerHTML = smile;

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
  }

  function buildPicker() {
    picker = createElement('div', CLASS_PICKER);

    const pickerContent = createElement('div', CLASS_PICKER_CONTENT);
    picker.appendChild(pickerContent);

    renderTabs(pickerContent, hidePicker, callback);

    document.body.appendChild(picker);
    document.addEventListener('click', onDocumentClick);

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
