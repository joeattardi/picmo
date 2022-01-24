import { LazyLoader } from '../lazyLoad';
import { EmojiRecord } from '../types';

export default abstract class Renderer {
  abstract render(emoji: EmojiRecord, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement>;
}
