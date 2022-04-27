// const { createPopup } = window.picmo;

// import { createPopup } from 'picmo/dist/index';

// import TwemojiRenderer from 'picmo/dist/twemoji';
// import { createPopup } from 'picmo';
// import { TwemojiRenderer } from 'picmo/renderers/twemoji';
// import { NativeRenderer } from 'picmo/renderers/native';
// import { createPopup } from 'picmo';
import { createPopup } from '@picmo/popup-picker';
import { TwemojiRenderer } from '@picmo/renderer-twemoji';

const button = document.querySelector('#native .emoji-button');

const picker = createPopup({
  referenceElement: button,
  triggerElement: button,
  position: 'right-start'
});

button.addEventListener('click', () => {
  picker.toggle();
});

// const twemoji = document.querySelector('#twemoji .emoji-button');
// const twemojiPicker = createPopup({
//   referenceElement: twemoji,
//   triggerElement: twemoji,
//   renderer: new TwemojiRenderer(),
//   position: 'right-start'
// });

// twemoji.addEventListener('click', () => {
//   twemojiPicker.toggle();
// });
