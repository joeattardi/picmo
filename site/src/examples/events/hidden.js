const picker = new EmojiButton();

picker.on('hidden', () => {
  alert('"hidden" event fired');
});