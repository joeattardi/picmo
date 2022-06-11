import { View } from './view';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { RecentEmojiContainer } from './RecentEmojiContainer';
import { Category, EmojiRecord } from '../types';
import { LazyLoader } from '../LazyLoader';
import { categoryIcons } from '../icons';
import template from './RecentEmojiCategory.template';
import classes from './EmojiCategory.scss';
import { RecentsProvider } from '../recents/RecentsProvider';

type RecentEmojiCategoryOptions = {
  category: Category;
  provider: RecentsProvider;
  lazyLoader?: LazyLoader;
};
export class RecentEmojiCategory extends BaseEmojiCategory {
  emojiContainer: RecentEmojiContainer;
  private provider: RecentsProvider;

  constructor({ category, lazyLoader, provider }: RecentEmojiCategoryOptions) {
    super({ category, showVariants: false, lazyLoader, template });
    this.provider = provider;
  }

  initialize() {
    this.uiElements = {
      ...this.baseUIElements,
      recents: View.byClass(classes.recentEmojis),
    };

    this.appEvents = {
      'recent:add': this.addRecent
    };

    super.initialize();
  }

  async addRecent(recent: EmojiRecord) {
    await this.emojiContainer.addOrUpdate(recent);
    this.ui.recents.dataset.empty = 'false';
  }

  async render(): Promise<HTMLElement> {
    const recents = this.provider?.getRecents(this.options.maxRecents);

    this.emojiContainer = this.viewFactory.create(RecentEmojiContainer, {
      emojis: recents,
      showVariants: false,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    });

    await super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: recents.length,
      icon: categoryIcons[this.category.key]
    });
    
    return this.el;
  }
}
