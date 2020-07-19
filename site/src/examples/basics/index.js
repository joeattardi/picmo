import { EmojiButton } from '@joeattardi/emoji-button';

const picker = new EmojiButton();
const trigger = document.querySelector('.trigger');

picker.on('emoji', selection => {
  // `selection` object has an `emoji` property
  // containing the selected emoji
});

trigger.addEventListener('click', () => picker.togglePicker(trigger));
