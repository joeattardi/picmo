import './EmojiButton.css';
import { createPicker, createPopup } from '../../src/index';

import { renderTemplateSync } from '../templates';

function getUIFlags(options: any) {
  const flags = {
    showRecents: false,
    showCategoryTabs: false,
    showSearch: false,
    showVariants: false,
    showPreview: false
  };

  if (options.uiElements) {
    options.uiElements.forEach(element => {
      flags[element] = true;
    })
  }

  return flags;
}

function handleEmojiSelection(button: HTMLButtonElement) {
  return selection => {
    const { emoji, url } = selection;
    button.classList.remove('empty');

    if (url) {
      const img = document.createElement('img');
      img.src = url;
      button.replaceChildren(img);
    } else {
      button.replaceChildren(emoji);
    }
  };
}

export function renderPicker(options: any = {}) {
  const rootElement = renderTemplateSync(`
    <div>
      <button class="emoji-button empty"></button>
      <div class="picker"></div>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button');
  const pickerElement = rootElement.querySelector<HTMLElement>('.picker');

  const picker = createPicker({
    ...options,
    ...getUIFlags(options),
    rootElement: pickerElement
  });

  picker.on('emoji:select', handleEmojiSelection(button));
  picker.on('emoji:select', options.emojiSelect);
  return rootElement;
}

export function createPopupPicker(options: any = {}) {
  const rootElement = renderTemplateSync(`
    <div>
      <button class="emoji-button empty"></button>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button');

  const picker = createPopup({
    ...options,
    ...getUIFlags(options),
    // showSearch: false,
    // autoFocusSearch: false,
    triggerElement: button,
    referenceElement: button
  });

  window.parent.addEventListener(
    'click',
    () => {
      if (picker.isOpen) {
        picker.close();
      }
    },
    { once: true }
  );

  button.addEventListener('click', () => {
    picker.toggle();
  });

  picker.on('emoji:select', handleEmojiSelection(button));
  picker.on('emoji:select', options.emojiSelect);
  picker.on('picker:open', options.pickerOpen);
  picker.on('picker:close', options.pickerClose);
  
  return rootElement;
}
