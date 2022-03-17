import { Emoji } from 'emojibase';
import { Renderer } from './renderer';
import { compileTemplate } from '../templates';
import { EmojiSelection } from '../types';

const template = compileTemplate('<span><%= emoji %></span>');

export default class NativeRenderer extends Renderer {
  async render(emoji: Emoji): Promise<HTMLElement> {
    return await template({ emoji: emoji.emoji });
  }

  emit({ emoji, label }: Emoji): EmojiSelection {
    return { emoji, label };
  }
}
