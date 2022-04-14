import { Renderer } from './renderer';
import { compileTemplateSync } from '../templates';
import { EmojiRecord, EmojiSelection } from '../types';

const template = compileTemplateSync('<span><%= emoji %></span>');

export default class NativeRenderer extends Renderer {
  render(emoji: EmojiRecord) {
    return this.renderElement(template({ emoji: emoji.emoji }));
  }

  emit({ emoji, label }: EmojiRecord): EmojiSelection {
    return { emoji, label };
  }
}
