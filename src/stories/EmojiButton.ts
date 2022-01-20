import './EmojiButton.css';
import { EmojiButton } from '../../src/index';

export function createNativePicker(options = {}) {
  const picker = new EmojiButton(options);

  const button = document.createElement('button');
  button.className = 'emoji-button';
  button.innerHTML = '😎';
  button.addEventListener('click', () => {
    picker.togglePicker(button);

    window.parent.addEventListener(
      'click',
      () => {
        picker.hidePicker();
      },
      { once: true }
    );
  });

  picker.on('emoji', ({ emoji }) => {
    button.innerHTML = emoji;
  });

  return button;
}
