import { BaseEmojiCategory } from './BaseEmojiCategory';
import { EmojiContainer } from './EmojiContainer';
import { LazyLoader } from '../LazyLoader';
import { categoryIcons } from '../icons';
import { Category, EmojiExtra } from '../types';
import template from './EmojiCategory.template';

type EmojiCategoryOptions = {
  category: Category;
  showVariants: boolean;
  lazyLoader?: LazyLoader;
  emojiVersion: number;
  extraData?: EmojiExtra;
};
export class EmojiCategory extends BaseEmojiCategory {
  private emojiVersion: number;

  constructor({ category, showVariants, lazyLoader, emojiVersion, extraData }: EmojiCategoryOptions) {
    super({ category, showVariants, lazyLoader, template });

    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
    this.emojiVersion = emojiVersion;
    this.extraData = extraData;
  }

  initialize() {
    this.uiElements = { ...this.baseUIElements };
    super.initialize();
  }

  async render(): Promise<HTMLElement> {
    await this.emojiDataPromise;
    const emojis = await this.emojiData.getEmojis(this.category, this.emojiVersion, this.extraData);

    this.emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    });

    return super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: emojis.length,
      icon: categoryIcons[this.category.key]
    });
  }
}
