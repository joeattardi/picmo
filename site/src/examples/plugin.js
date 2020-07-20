import { EmojiButton } from './dist/index.js';

const trigger = document.querySelector('#trigger');

const removePlugin = {
  render(picker) {
    const button = document.createElement('button');
    button.innerHTML = 'Remove';
    button.addEventListener('click', () => {
      trigger.innerHTML = '';
      picker.hidePicker();
    });

    return button;
  }
};

const picker = new EmojiButton({
  plugins: [removePlugin]
});

picker.on('emoji', selection => {
  trigger.innerHTML = selection.emoji;
});

trigger.addEventListener('click', () => picker.togglePicker(trigger));
