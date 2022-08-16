// import { globalConfig } from 'picmo';
import { createPopup } from '@picmo/popup-picker';
import { TwemojiRenderer } from '@picmo/renderer-twemoji';

// globalConfig.injectStyles = true;

const selectionContainer = document.querySelector('#selection-outer');
const emoji = document.querySelector('#selection-emoji');
const name = document.querySelector('#selection-name');

const trigger = document.querySelector('#trigger');

const picker = createPopup({
  renderer: new TwemojiRenderer()
}, {
  triggerElement: trigger,
  referenceElement: trigger
});

trigger.addEventListener('click', () => {
  picker.toggle();
});

picker.addEventListener('emoji:select', (selection) => {
  console.log(selection);
  emoji.innerHTML = selection.emoji;
  name.textContent = selection.label;

  selectionContainer.classList.remove('empty');
});
