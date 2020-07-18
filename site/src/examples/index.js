import { EmojiButton } from '@joeattardi/emoji-button';

const picker = new EmojiButton();
const trigger = document.querySelector('.trigger');

picker.on('emoji', emoji => {
  trigger.innerHTML = emoji;
});

trigger.addEventListener('click', () => picker.togglePicker());
