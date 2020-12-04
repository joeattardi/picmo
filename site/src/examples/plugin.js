import { EmojiButton } from '@joeattardi/emoji-button';

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
