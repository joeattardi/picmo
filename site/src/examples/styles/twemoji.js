import { EmojiButton } from '@joeattardi/emoji-button';

const trigger = document.querySelector('.trigger');

const picker = new EmojiButton({
  style: 'twemoji'
});

picker.on('emoji', selection => {
  // Remove the old image
  trigger.removeChild(trigger.firstChild);

  // Add the new image for the new Twemoji
  const img = document.createElement('img');
  img.src = selection.url;
  img.alt = selection.emoji + ' ' + selection.name;
  trigger.appendChild(img);
});

trigger.addEventListener('click', () => {
  picker.togglePicker(trigger);
});
