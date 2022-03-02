import './EmojiButton.css';
import { EmojiPicker } from '../../src/index';

export function createPicker(options = {}) {
  const button = document.createElement('button');
  button.className = 'emoji-button empty';

  const picker = new EmojiPicker({
    ...options,
    referenceElement: button
  });

  button.addEventListener('click', () => {
    picker.togglePicker(button);

    window.parent.addEventListener(
      'click',
      () => {
        if (picker.isPickerVisible()) {
          picker.hidePicker();
        }
      },
      { once: true }
    );

    picker.on('emoji', ({ emoji, url }) => {
      button.classList.remove('empty');

      if (url) {
        const img = document.createElement('img');
        img.src = url;
        button.replaceChildren(img);
      } else {
        button.replaceChildren(emoji);
      }
    });
  });

  // const img = icons.smile();
  // return img;

  return button;
}
