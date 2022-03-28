import './EmojiButton.css';
import { createEmojiPicker, createPopup } from '../../src/index';

import { renderTemplateSync } from '../templates';

function handleEmojiSelection(button, eventData) {
  return selection => {
    eventData.textContent = JSON.stringify(selection, null, 2);
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

export function createPicker(options = {}) {
  const rootElement = renderTemplateSync(`
    <div>
      <button class="emoji-button empty"></button>
      <div class="picker"></div>
      <div class="event-area">
        <h2>Last event</h2>
        <pre class="event-data">No events yet</pre>
      </div>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button');
  const pickerElement = rootElement.querySelector<HTMLElement>('.picker');
  const eventData = rootElement.querySelector('.event-data');

  const picker = createEmojiPicker({
    ...options,
    rootElement: pickerElement
  });

  picker.on('emoji:select', handleEmojiSelection(button, eventData));
  return rootElement;
}

export function createPopupPicker(options = {}) {
  const rootElement = renderTemplateSync(`
    <div>
      <button class="emoji-button empty"></button>
      <div class="event-area">
        <h2>Last event</h2>
        <pre class="event-data">No events yet</pre>
      </div>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button');
  const eventData = rootElement.querySelector('.event-data');

  const picker = createPopup({
    ...options,
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
  picker.on('emoji:select', handleEmojiSelection(button, eventData));
  return rootElement;
}
