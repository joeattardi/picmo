import { LazyLoader } from '../LazyLoader';
import { CustomEmoji, EmojiRecord, EmojiSelection } from '../types';
import { View } from '../views/view';
import { Image } from '../views/Image';

import classes from './custom.scss';

export type RenderTask = {
  content: View | HTMLElement;
  resolver?: () => HTMLElement;
}

export abstract class Renderer {
  abstract render(emoji: EmojiRecord, classNames?: string): RenderTask;
  abstract emit(emoji: EmojiRecord): EmojiSelection | Promise<EmojiSelection>;

  renderElement(content: HTMLElement): RenderTask {
    return { content };
  }

  renderImage(classNames = '', urlResolver: () => string | Promise<string>): RenderTask {
    const image = new Image({ classNames });
    image.renderSync();

    const resolver = () => {
      image.load(urlResolver());
      return image.el;
    }

    return { content: image, resolver };
  }

  doRender(emoji: EmojiRecord, lazyLoader?: LazyLoader, classNames?: string): HTMLElement {
    if (emoji.custom) {
      return this.renderCustom(emoji as CustomEmoji, lazyLoader, classNames);
    }

    const { content, resolver } = this.render(emoji, classNames);
    const contentElement = content instanceof HTMLElement ? content : content.el;

    if (lazyLoader && resolver) {
      return lazyLoader.lazyLoad(contentElement, resolver)
    }

    if (resolver) {
      resolver();
    }
    return contentElement;
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

    const { content, resolver } = this.renderImage(classNames, () => emoji.url);
    const contentElement = content instanceof HTMLElement ? content : content.el;

    if (resolver) {
      resolver();
    }

    return contentElement;
  }
}
