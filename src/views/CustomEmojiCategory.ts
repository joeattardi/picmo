import { Template } from '../Template';
import { EmojiContainer } from './EmojiContainer';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { LazyLoader } from '../LazyLoader';
import { Category } from '../types';
import { categoryIcons } from '../icons';

type CustomEmojiCategoryOptions = {
  category: Category;
  lazyLoader?: LazyLoader;
}

const template = new Template(({ classes, category, pickerId, icon, i18n }) => /* html */`
  <div class="${classes.emojiCategory}" role="tabpanel" aria-labelledby="${pickerId}-category-${category.key}">
    <h3 data-category="${category.key}" class="${classes.categoryName}">
      <i data-icon="${icon}"></i>
      ${i18n.get(`categories.${category.key}`, category.message || category.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </div>
`, { mode: 'async' });

export class CustomEmojiCategory extends BaseEmojiCategory {
  constructor({ category, lazyLoader }: CustomEmojiCategoryOptions) {
    super({ template, showVariants: false, lazyLoader, category})
  }

  initialize() {
    this.uiElements = { ...this.baseUIElements };
    super.initialize();
  }

  async render(): Promise<HTMLElement> {
    this.emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis: this.customEmojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    });

    return super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: this.customEmojis.length,
      icon: categoryIcons[this.category.key]
    });
  }
}