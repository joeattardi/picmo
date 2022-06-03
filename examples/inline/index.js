import { createPicker } from 'picmo';

const rootElement = document.querySelector('#picker');
const selectionContainer = document.querySelector('#selection-outer');
const emoji = document.querySelector('#selection-emoji');
const name = document.querySelector('#selection-name');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  console.log('submit');
  event.preventDefault();
});

const picker = createPicker({
  rootElement,
});

picker.addEventListener('emoji:select', (selection) => {
  emoji.innerHTML = selection.emoji;
  name.textContent = selection.label;

  selectionContainer.classList.remove('empty');
});
