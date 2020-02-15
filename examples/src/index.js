var EmojiButton = require('@joeattardi/emoji-button');

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
