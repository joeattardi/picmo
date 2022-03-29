import './EmojiButton.css';
import { createEmojiPicker, createPopup } from '../../src/index';

import { renderTemplateSync } from '../templates';

function handleEvent(event: string, button: HTMLButtonElement, eventArea: HTMLElement) {
  return selection => {
    const title = eventArea.querySelector('h2');
    const eventData = eventArea.querySelector('.event-data');

    eventArea.style.display = 'block';
    eventData.textContent = JSON.stringify(selection, null, 2);
    title.innerHTML = `Received event: <code>${event}</code>`;

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
      <div class="event-area" style="display: none;">
        <h2>Received event:</h2>
        <pre class="event-data">No events yet</pre>
      </div>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button');
  const pickerElement = rootElement.querySelector<HTMLElement>('.picker');
  const eventArea = rootElement.querySelector<HTMLElement>('.event-area');

  const picker = createEmojiPicker({
    ...options,
    rootElement: pickerElement
  });

  picker.on('emoji:select', handleEvent('emoji:select', button, eventArea));
  return rootElement;
}

export function createPopupPicker(options = {}) {
  const rootElement = renderTemplateSync(`
    <div>
      <button class="emoji-button empty"></button>
      <div class="event-area" style="display: none;">
        <h2>Received event:</h2>
        <pre class="event-data">No events yet</pre>
      </div>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button');
  const eventArea = rootElement.querySelector<HTMLElement>('.event-area');

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
  picker.on('emoji:select', handleEvent('emoji:select', button, eventArea));
  return rootElement;
}
