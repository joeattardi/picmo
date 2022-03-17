import template from '../templates/emojiCategory.ejs';

import { EmojiContainer } from './EmojiContainer';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { LazyLoader } from '../LazyLoader';
import { Category } from '../types';

type CustomEmojiCategoryOptions = {
  category: Category;
  lazyLoader?: LazyLoader;
}

export class CustomEmojiCategory extends BaseEmojiCategory {
  constructor({ category, lazyLoader }: CustomEmojiCategoryOptions) {
    super({ template, showVariants: false, lazyLoader, category})
  }

  initialize() {
    this.uiElements = { ...this.baseUIElements };
    super.initialize();
  }

  async render(): Promise<HTMLElement> {
    const emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis: this.customEmojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader
    });

    return super.render({
      category: this.category,
      emojis: emojiContainer,
      emojiCount: this.customEmojis.length
    });
  }
}