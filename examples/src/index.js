const EmojiButton = require('@joeattardi/emoji-button');

if (location.hostname === 'localhost') {
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>');
}

window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#emoji-button');
  const picker = new EmojiButton();

  picker.on('emoji', emoji => {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', () => {
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
  });
});
