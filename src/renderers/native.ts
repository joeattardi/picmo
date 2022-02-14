import Renderer from './renderer';
import { compileTemplate } from '../templates';

const template = compileTemplate('<span><%= emoji %></span>');

export default class NativeRenderer extends Renderer {
  render(emoji: any): HTMLElement {
    return template({ emoji: emoji.emoji });
  }

  emit({ emoji, name }: any): any {
    return { emoji, name };
  }
}
