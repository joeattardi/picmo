import { Emoji } from 'emojibase';
import { LazyLoader } from '../LazyLoader';
import { CustomEmoji, EmojiSelection } from '../types';

import classes from './custom.scss';

function isCustom(emoji: Emoji | CustomEmoji) {
  return (emoji as CustomEmoji).url !== undefined;
}

import preloadImage from '../preload';
export abstract class Renderer {
  abstract render(emoji: Emoji, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement>;
  abstract emit(emoji: Emoji): EmojiSelection | Promise<EmojiSelection>;

  doRender(emoji: Emoji | CustomEmoji, lazyLoader?: LazyLoader): HTMLElement | Promise<HTMLElement> {
    if (isCustom(emoji)) {
      return this.renderCustom(emoji as CustomEmoji, lazyLoader);
    }

    return this.render(emoji as Emoji, lazyLoader);
  }

  doEmit(emoji: Emoji | CustomEmoji): EmojiSelection | Promise<EmojiSelection> {
    if (isCustom(emoji)) {
      return this.emitCustom(emoji as CustomEmoji);
    }

    return this.emit(emoji as Emoji);
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
