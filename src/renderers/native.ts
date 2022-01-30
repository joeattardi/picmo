import Renderer from './renderer';
import { EmojiRecord, EmojiSelection } from '../types';
import { compileTemplate } from '../templates';

const template = compileTemplate('<span><%= emoji %></span>');

export default class NativeRenderer extends Renderer {
  render(emoji: EmojiRecord): HTMLElement {
    return template({ emoji: emoji.emoji });
  }

  emit({ emoji, name }: EmojiRecord): EmojiSelection {
    return { emoji, name };
  }
}
