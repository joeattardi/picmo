import './EmojiButton.css';
import { createEmojiPicker } from '../../src/index';

export function createPicker(options = {}) {
  const button = document.createElement('button');
  button.className = 'emoji-button empty';

  createEmojiPicker({
    ...options,
    referenceElement: button
  }).then(picker => {
    button.addEventListener('click', () => {
      picker.on('emoji:select', ({ emoji, url }) => {
        button.classList.remove('empty');

        if (url) {
          const img = document.createElement('img');
          img.src = url;
          button.replaceChildren(img);
        } else {
          button.replaceChildren(emoji);
        }
      });
      picker.open();
    });
  });

  // button.addEventListener('click', () => {
  //   // picker.togglePicker(button);
  //   picker.open();

  //   // window.parent.addEventListener(
  //   //   'click',
  //   //   () => {
  //   //     if (picker.isPickerVisible()) {
  //   //       picker.hidePicker();
  //   //     }
  //   //   },
  //   //   { once: true }
  //   // );

  //   // picker.on('emoji:select', ({ emoji, url }) => {
  //   //   button.classList.remove('empty');

  //   //   if (url) {
  //   //     const img = document.createElement('img');
  //   //     img.src = url;
  //   //     button.replaceChildren(img);
  //   //   } else {
  //   //     button.replaceChildren(emoji);
  //   //   }
  //   // });
  // });

  // const img = icons.smile();
  // return img;

  return button;
}
