const { createPopup } = window.picmo;

// import { createPopup } from 'picmo/dist/index';

// import TwemojiRenderer from 'picmo/dist/twemoji';
// import { createPopup } from 'picmo';
// import TwemojiRenderer from 'picmo/renderers/twemoji';
// import NativeRenderer from 'picmo/renderers/native';

// TODO: doesnt work unless rootElement explicitly defined?
const button = document.querySelector('#native .emoji-button');
// const picker = createPopup({ referenceElement: button, triggerElement: button, renderer: new TwemojiRenderer() });
const picker = createPopup({
  referenceElement: button,
  triggerElement: button,
  rootElement: document.body  
});

button.addEventListener('click', () => {
  picker.toggle();
});

const twemoji = document.querySelector('#twemoji .emoji-button');
const twemojiPicker = createPopup({
  referenceElement: twemoji,
  triggerElement: twemoji,
  rootElement: document.body,
  renderer: new window.TwemojiRenderer()
});

twemoji.addEventListener('click', () => {
  twemojiPicker.toggle();
});
