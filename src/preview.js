import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement } from './util';

const CLASS_PREVIEW = 'emoji-picker__preview';
const CLASS_PREVIEW_EMOJI = 'emoji-picker__preview-emoji';
const CLASS_PREVIEW_NAME = 'emoji-picker__preview-name';

export function renderPreview(events) {
  const preview = createElement('div', CLASS_PREVIEW);
  
  const emoji = createElement('div', CLASS_PREVIEW_EMOJI);
  preview.appendChild(emoji);

  const name = createElement('div', CLASS_PREVIEW_NAME);
  preview.appendChild(name);

  events.on(SHOW_PREVIEW, preview => {
    emoji.innerHTML = preview.e;
    name.innerHTML = typeof preview.n === 'string' ? preview.n : preview.n[0];
  });

  events.on(HIDE_PREVIEW, () => {
    emoji.innerHTML = '';
    name.innerHTML = '';
  });

  return preview;
}