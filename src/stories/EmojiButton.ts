import './EmojiButton.css';
import { EmojiButton } from '../../src/index';

export function createPicker(options = {}) {
  const button = document.createElement('button');
  button.className = 'emoji-button empty';

  const picker = new EmojiButton({
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

    picker.on('emoji', ({ content, emoji }) => {
      button.classList.remove('empty');
      button.replaceChildren(content);
    });
  });

  // const img = icons.smile();
  // return img;

  return button;
}
