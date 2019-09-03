const EmojiButton = require('emoji-button');

document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
':35729/livereload.js?snipver=1"></' + 'script>');

window.addEventListener('DOMContentLoaded', () => {
  EmojiButton(document.querySelector('#emoji-button'), function (emoji) {
    document.querySelector('input').value += emoji;
  });
});
