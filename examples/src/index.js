hljs.initHighlightingOnLoad();

var EmojiButton = require('@joeattardi/emoji-button');

window.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('#native-button');
  var picker = new EmojiButton({
    theme: 'auto',
    position: 'bottom-end',
  });

  picker.on('emoji', function (emoji) {
    document.querySelector('#native-contenteditable').innerHTML += emoji;
  });

  button.addEventListener('click', function () {
    picker.togglePicker(button);
  });


  var twemojiButton = document.querySelector('#twemoji-button');
  var twemojiPicker = new EmojiButton({
    theme: 'auto',
    style: 'twemoji',
    position: 'bottom-end'
  });

  twemojiPicker.on('emoji', function (emoji) {
    const textarea = document.querySelector('#emoji-contenteditable');
    const newEl = document.createElement('span');
    newEl.innerHTML = emoji;
    textarea.appendChild(newEl);
  });

  twemojiButton.addEventListener('click', function () {
    twemojiPicker.togglePicker(twemojiButton);
  })
});
