import { createPicker, EmojiPicker, type EmojiRecord } from './src';

// const picker = createPicker({
//   rootElement: document.querySelector('#picker') as HTMLElement,
//   showRecents: false
// });

// console.log(picker);

const picker = new EmojiPicker({ showRecents: false });
document.querySelector('#picker')?.appendChild(picker);

picker.addEventListener('emojiselect', ((event: CustomEvent<EmojiRecord>) => {
  console.log('emojiSelect', event.detail.emoji);
}) as EventListener);

