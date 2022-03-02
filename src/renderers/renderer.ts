import { LazyLoader } from '../lazyLoad';

export abstract class Renderer {
  abstract render(emoji: any, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement>;
  abstract emit(emoji: any): any | Promise<any>;
}
