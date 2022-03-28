import './EmojiButton.css';
import { createEmojiPicker, createPopup } from '../../src/index';

export function createPicker(options = {}) {
  const rootElement = document.createElement('div');
  
  const button = document.createElement('button');
  button.className = 'emoji-button empty';
  const pickerElement = document.createElement('div');

  rootElement.appendChild(button);
  rootElement.appendChild(pickerElement);

  const picker = createEmojiPicker({
    ...options,
    rootElement: pickerElement,
  });

  picker.on('emoji:select', selection => {
    const { emoji, url } = selection;
    button.classList.remove('empty');

    if (url) {
      const img = document.createElement('img');
      img.src = url;
      button.replaceChildren(img);
    } else {
      button.replaceChildren(emoji);
    }
  });

  return rootElement;
}

export function createPopupPicker(options = {}) {
  const button = document.createElement('button');
  button.className = 'emoji-button empty';

  const picker = createPopup({
    ...options,
    triggerElement: button,
    referenceElement: button,
  });

  window.parent.addEventListener('click', () => {
    if (picker.isOpen) {
      picker.close();
    }
  }, { once: true });

  button.addEventListener('click', () => { picker.toggle() });

  picker.on('emoji:select', selection => {
    const { emoji, url } = selection;
    button.classList.remove('empty');

    if (url) {
      const img = document.createElement('img');
      img.src = url;
      button.replaceChildren(img);
    } else {
      button.replaceChildren(emoji);
    }
  });

  return button;
}
