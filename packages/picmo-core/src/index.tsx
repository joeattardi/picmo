import register from 'preact-custom-element';
import { render } from 'preact';
import { EmojiPicker } from '../../picmo-react/src';

export function createPicker(rootElement: HTMLElement) {
  render(<EmojiPicker />, rootElement);
}

register(EmojiPicker, 'picmo-picker', []);
