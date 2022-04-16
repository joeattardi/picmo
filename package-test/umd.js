const { createPopup } = window.picmo;

console.log(window.picmo);

document.addEventListener('DOMContentLoaded', () => {
  const nativeButton = document.querySelector('#native .emoji-button');
  const nativePicker = createPopup({
    referenceElement: nativeButton,
    triggerElement: nativeButton,
    position: 'right-start'
  });

  nativePicker.addEventListener('emoji:select', selection => {
    const { emoji } = selection;
    nativeButton.replaceChildren(emoji);
  });

  nativeButton.addEventListener('click', () => {
    nativePicker.toggle();
  });

  const twemojiButton = document.querySelector('#twemoji .emoji-button');
  const twemojiPicker = createPopup({
    renderer: new window.TwemojiRenderer(),
    referenceElement: twemojiButton,
    triggerElement: twemojiButton,
    position: 'right-start'
  });

  twemojiPicker.addEventListener('emoji:select', selection => {
    const { url } = selection;
    const img = document.createElement('img');
    img.src = url;
    twemojiButton.replaceChildren(img);
  });

  twemojiButton.addEventListener('click', () => {
    twemojiPicker.toggle();
  });
});
