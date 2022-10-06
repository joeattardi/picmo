import { toElement, getUIFlags } from './common';
import { lightTheme, darkTheme, createPicker } from '../../packages/picmo/src/index';
import './EmojiButton.css';


function handleEmojiSelection(button: HTMLButtonElement) {
  return selection => {
    const { emoji, url } = selection;
    button.classList.remove('empty');

    if (url) {
      const img = document.createElement('img');
      img.src = url;
      button.replaceChildren(img);
    } else {
      button.replaceChildren(emoji);
    }
  };
}

export function renderPicker(options: any = {}) {
  const rootElement = toElement(/* html */`
  <div>
      <button type="button" class="emoji-button empty"></button>
      <div class="picker"></div>
    </div>
  `);

  const button = rootElement.querySelector<HTMLButtonElement>('.emoji-button') as HTMLButtonElement;
  const pickerElement = rootElement.querySelector<HTMLElement>('.picker');

  const picker = createPicker({
    ...options,
    ...getUIFlags(options),
    rootElement: pickerElement
  });

  setTimeout(() => {
    picker.updateOptions({
      className: 'foobarbaz'
    });
  }, 3000);

  // setTimeout(() => picker.setEmojisPerRow(3), 3000);

  picker.addEventListener('emoji:select', handleEmojiSelection(button));
  picker.addEventListener('emoji:select', options.emojiSelect);
  return rootElement;
}
