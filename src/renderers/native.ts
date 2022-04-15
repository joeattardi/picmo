import { Renderer } from './renderer';
import { compileTemplateSync } from '../templates';
import { EmojiRecord, EmojiSelection } from '../types';

const template = compileTemplateSync('<span><%= emoji %></span>');

export class NativeRenderer extends Renderer {
  render(emoji: EmojiRecord) {
    return this.renderElement(template({ emoji: emoji.emoji }));
  }

  emit({ emoji, hexcode, label }: EmojiRecord): EmojiSelection {
    return { emoji, hexcode, label };
  }
}
