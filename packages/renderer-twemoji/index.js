import { createPicker } from 'picmo';
import { TwemojiRenderer } from './src/index';

const rootElement = document.querySelector('#picker');
const selectionContainer = document.querySelector('#selection-outer');
const emoji = document.querySelector('#selection-emoji');
const name = document.querySelector('#selection-name');

const picker = createPicker({
  rootElement,
  renderer: new TwemojiRenderer()
});

picker.addEventListener('emoji:select', (selection) => {
  console.log(selection);
  emoji.innerHTML = `<img src=${selection.url} />`;
  name.textContent = selection.label;

  selectionContainer.classList.remove('empty');
});
