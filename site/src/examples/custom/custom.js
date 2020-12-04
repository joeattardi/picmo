import { EmojiButton } from '@joeattardi/emoji-button';

const trigger = document.querySelector('#trigger');

const picker = new EmojiButton({
  custom: [
    {
      name: 'Conga parrot',
      emoji: './site/static/conga_parrot.gif'
    },
    {
      name: 'O RLY?',
      emoji: './site/static/orly.jpg'
    }
  ]
});

picker.on('emoji', selection => {
  trigger.removeChild(trigger.firstChild);

  if (selection.url) {
    const img = document.createElement('img');
    img.src = selection.url;
    img.alt = selection.emoji + ' ' + selection.name;
    trigger.appendChild(img);
  } else {
    const span = document.createElement('span');
    span.innerHTML = selection.emoji + ' ' + selection.name;
    trigger.appendChild(span);
  }
});

trigger.addEventListener('click', () => picker.togglePicker(trigger));
