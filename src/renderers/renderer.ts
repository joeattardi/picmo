import { LazyLoader } from '../lazyLoad';
// import { EmojiRecord, EmojiSelection } from '../types';

export default abstract class Renderer {
  abstract render(emoji: any, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement>;
  abstract emit(emoji: any): any | Promise<any>;
}
