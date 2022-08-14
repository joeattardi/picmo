// import { globalConfig } from 'picmo';
import { createPopup } from './src/index';

// globalConfig.injectStyles = true;

const selectionContainer = document.querySelector('#selection-outer');
const emoji = document.querySelector('#selection-emoji');
const name = document.querySelector('#selection-name');

const trigger = document.querySelector('#trigger');

const picker = createPopup({}, {
  triggerElement: trigger,
  referenceElement: trigger
});

trigger.addEventListener('click', () => {
  picker.toggle();
});

picker.addEventListener('emoji:select', (selection) => {
  emoji.innerHTML = selection.emoji;
  name.textContent = selection.label;

  selectionContainer.classList.remove('empty');
});
