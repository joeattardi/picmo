import './EmojiButton.css';
import { EmojiButton } from '../../src/index';

export function createPicker(options = {}) {
  const picker = new EmojiButton(options);

  const button = document.createElement('button');
  button.className = 'emoji-button empty';

  button.addEventListener('click', () => {
    picker.togglePicker(button);

    window.parent.addEventListener(
      'click',
      () => {
        picker.hidePicker();
      },
      { once: true }
    );

    picker.on('emoji', ({ content, emoji }) => {
      button.classList.remove('empty');
      button.replaceChildren(content);
    });
  });

  return button;
}
