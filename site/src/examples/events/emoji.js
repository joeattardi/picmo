const picker = new EmojiButton();

picker.on('emoji', selection => {
  alert(`"emoji" event fired, emoji is ${selection.emoji} with name ${selection.name}`);
});