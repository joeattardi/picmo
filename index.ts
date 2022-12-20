import { EmojiPicker, type EmojiRecord } from './src';

const picker = new EmojiPicker({ showRecents: false });
document.querySelector('#picker')?.appendChild(picker);

picker.addEventListener('emojiselect', ((event: CustomEvent<EmojiRecord>) => {
  console.log('emojiSelect', event.detail.emoji);
}) as EventListener);
