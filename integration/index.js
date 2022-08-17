// import { globalConfig } from 'picmo';
// import { createPopup } from '@picmo/popup-picker';
// import { TwemojiRenderer } from '@picmo/renderer-twemoji';

// globalConfig.injectStyles = true;

const selectionContainer = document.querySelector('#selection-outer');
const emoji = document.querySelector('#selection-emoji');
const name = document.querySelector('#selection-name');

const trigger = document.querySelector('#trigger');

picmo.globalConfig.injectStyles = false;

// const picker = picmo.createPicker({
//   rootElement: document.querySelector('#picker'),
//   renderer: new picmoTwemoji.TwemojiRenderer()
// });

const picker = picmoPopup.createPopup({
  renderer: new picmoTwemoji.TwemojiRenderer()
}, {
  triggerElement: trigger,
  referenceElement: trigger,
  position: 'right-start'
});

trigger.addEventListener('click', () => {
  picker.toggle();
});

// picker.addEventListener('emoji:select', (selection) => {
//   emoji.innerHTML = selection.emoji;
//   name.textContent = selection.label;

//   selectionContainer.classList.remove('empty');
// });
