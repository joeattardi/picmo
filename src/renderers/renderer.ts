import { LazyLoader } from '../lazyLoad';
import { EmojiRecord, EmojiSelection } from '../types';

export default abstract class Renderer {
  abstract render(emoji: EmojiRecord, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement>;
  abstract emit(emoji: EmojiRecord): EmojiSelection | Promise<EmojiSelection>;
}
