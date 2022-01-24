import twemoji from 'twemoji';

import './EmojiButton.css';
import { EmojiButton } from '../../src/index';

import TwemojiRenderer from '../renderers/twemoji';

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

export function createTwemojiPicker(options = {}) {
  const picker = new EmojiButton({
    ...options,
    renderer: new TwemojiRenderer()
  });

  const button = document.createElement('button');
  button.className = 'emoji-button';
  button.innerHTML = twemoji.parse('😎', {
    folder: 'svg',
    ext: '.svg'
  });
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

  return button;
}
