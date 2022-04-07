// const { createPopup, TwemojiRenderer } = window.picmo;

// import { createPopup } from 'picmo/dist/index';

// import TwemojiRenderer from 'picmo/dist/twemoji';
import { createPopup } from 'picmo';
// import TwemojiRenderer from 'picmo/renderers/twemoji';
// import NativeRenderer from 'picmo/renderers/native';

const button = document.querySelector('#native .emoji-button');
// const picker = createPopup({ referenceElement: button, triggerElement: button, renderer: new TwemojiRenderer() });
const picker = createPopup({
  referenceElement: button,
  triggerElement: button
});


button.addEventListener('click', () => {
  picker.toggle();
});
