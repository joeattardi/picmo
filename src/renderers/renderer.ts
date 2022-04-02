import { LazyLoader } from '../LazyLoader';
import { CustomEmoji, EmojiRecord, EmojiSelection } from '../types';
import { Image } from '../views/Image';

import classes from './custom.scss';

export abstract class Renderer {
  abstract render(emoji: EmojiRecord, lazyLoader?: LazyLoader, classNames?: string): HTMLElement;
  abstract emit(emoji: EmojiRecord): EmojiSelection | Promise<EmojiSelection>;

  doRender(emoji: EmojiRecord, lazyLoader?: LazyLoader, classNames?: string): HTMLElement {
    if (emoji.custom) {
      return this.renderCustom(emoji as CustomEmoji, lazyLoader, classNames);
    }

    return this.render(emoji, lazyLoader, classNames);
  }

  doEmit(emoji: EmojiRecord): EmojiSelection | Promise<EmojiSelection> {
    if (emoji.custom) {
      return this.emitCustom(emoji as CustomEmoji);
    }

    return this.emit(emoji);
  }

  emitCustom({ url, label, emoji, data }: CustomEmoji): EmojiSelection {
    return { url, label, emoji, data };
  }

  renderCustom(emoji: CustomEmoji, lazyLoader?: LazyLoader, additionalClasses = ''): HTMLElement {
    const classNames = [classes.customEmoji, additionalClasses].join(' ').trim();
    const img = new Image({ classNames });
    img.renderSync();

    const factory = () => {
      img.load(emoji.url);
    };

    if (lazyLoader) {
      return lazyLoader.lazyLoad(img, factory);
    }

    factory();
    return img.el;
  }
}
