hljs.initHighlightingOnLoad();

var EmojiButton = require('@joeattardi/emoji-button');

window.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('#emoji-button');
  var picker = new EmojiButton({
    theme: 'dark'
  });

  picker.on('emoji', function (emoji) {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', function () {
    picker.togglePicker(button);
  });
});
