import { LazyLoader } from '../LazyLoader';
import { CustomEmoji, EmojiRecord, EmojiSelection } from '../types';

import classes from './custom.scss';

import preloadImage from '../preload';
export abstract class Renderer {
  abstract render(emoji: EmojiRecord, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement>;
  abstract emit(emoji: EmojiRecord): EmojiSelection | Promise<EmojiSelection>;

  doRender(emoji: EmojiRecord, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement> {
    if (emoji.custom) {
      return this.renderCustom(emoji as CustomEmoji, lazyLoader);
    }

    return this.render(emoji, lazyLoader);
  }

  doEmit(emoji: EmojiRecord): EmojiSelection | Promise<EmojiSelection> {
    if (emoji.custom) {
      return this.emitCustom(emoji as CustomEmoji);
    }

    return this.emit(emoji);
  }

  emitCustom({ url, label, emoji }: CustomEmoji): EmojiSelection {
    return { url, label, emoji }
  }

  renderCustom(emoji: CustomEmoji, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement> {
    const factory = async () => {
      const img = await preloadImage(emoji.url);
      img.className = classes.customEmoji;
      return img;
    };

    if (lazyLoader) {
      return lazyLoader.lazyLoad(factory);
    }

    return factory();
  }
}
