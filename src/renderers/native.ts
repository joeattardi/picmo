import { Renderer } from './renderer';
import { EmojiRecord, EmojiSelection } from '../types';
import { Template } from '../Template';

const template = new Template(({ emoji }) => /* html */ `<span>${emoji}</span>`);

export class NativeRenderer extends Renderer {
  render(emoji: EmojiRecord) {
    return this.renderElement(template.renderSync({ emoji: emoji.emoji }));
  }

  emit({ emoji, hexcode, label }: EmojiRecord): EmojiSelection {
    return { emoji, hexcode, label };
  }
}
