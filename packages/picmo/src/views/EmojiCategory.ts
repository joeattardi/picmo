import { Template } from '../Template';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { EmojiContainer } from './EmojiContainer';
import { LazyLoader } from '../LazyLoader';
import { categoryIcons } from '../icons';
import { Category } from '../types';

const template = new Template(({ classes, category, pickerId, icon, i18n }) => /* html */`
  <div class="${classes.emojiCategory}" role="tabpanel" aria-labelledby="${pickerId}-category-${category.key}">
    <h3 data-category="${category.key}" class="${classes.categoryName}">
      <i data-icon="${icon}"></i>
      ${i18n.get(`categories.${category.key}`, category.message || category.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </div>
`, { mode: 'async' });

type EmojiCategoryOptions = {
  category: Category;
  showVariants: boolean;
  lazyLoader?: LazyLoader;
  emojiVersion: number;
};
export class EmojiCategory extends BaseEmojiCategory {
  private emojiVersion: number;

  constructor({ category, showVariants, lazyLoader, emojiVersion }: EmojiCategoryOptions) {
    super({ category, showVariants, lazyLoader, template });

    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
    this.emojiVersion = emojiVersion;
  }

  initialize() {
    this.uiElements = { ...this.baseUIElements };
    super.initialize();
  }

  async render(): Promise<HTMLElement> {
    await this.emojiDataPromise;
    const emojis = await this.emojiData.getEmojis(this.category, this.emojiVersion);

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
