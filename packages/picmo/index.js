import { createPicker, globalConfig } from './src/index';

globalConfig.injectStyles = true;

const rootElement = document.querySelector('#picker');
const selectionContainer = document.querySelector('#PicMo_selection-outer');
const emoji = document.querySelector('#PicMo_selection-emoji');
const name = document.querySelector('#PicMo_selection-name');

const picker = createPicker({
  rootElement
});

picker.addEventListener('emoji:select', (selection) => {
  emoji.innerHTML = selection.emoji;
  name.textContent = selection.label;

  selectionContainer.classList.remove('empty');
});
