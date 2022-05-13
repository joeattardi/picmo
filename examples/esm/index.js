import { createPicker } from 'https://unpkg.com/picmo@5.0.0-beta.7/dist/index.js';

const rootElement = document.querySelector('#picker');
const selectionContainer = document.querySelector('#selection-outer');
const emoji = document.querySelector('#selection-emoji');
const name = document.querySelector('#selection-name');

const picker = createPicker({
  rootElement,
});

picker.addEventListener('emoji:select', (selection) => {
  emoji.innerHTML = selection.emoji;
  name.textContent = selection.label;

  selectionContainer.classList.remove('empty');
});
