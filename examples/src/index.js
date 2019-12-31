var EmojiButton = require('@joeattardi/emoji-button');

if (location.hostname === 'localhost') {
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>');
}

window.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('#emoji-button');
  var picker = new EmojiButton();

  picker.on('emoji', function (emoji) {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', function () {
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
  });
});
