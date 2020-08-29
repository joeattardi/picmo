import { EmojiButton } from '@joeattardi/emoji-button';

const picker = new EmojiButton();

document.querySelector('#set-theme-dark').addEventListener('click', () => picker.setTheme("dark"));
document.querySelector('#set-theme-light').addEventListener('click', () => picker.setTheme("light"));
document.querySelector('#set-theme-auto').addEventListener('click', () => picker.setTheme("auto"));