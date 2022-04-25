import { View } from './view';
import { BaseEmojiCategory } from './BaseEmojiCategory';
import { RecentEmojiContainer } from './RecentEmojiContainer';
import { Category, EmojiRecord } from '../types';
import { LazyLoader } from '../LazyLoader';
import { categoryIcons } from '../icons';
import { getRecents, clear } from '../recents';
import { Template } from '../Template';

import classes from './EmojiCategory.scss';

const template = new Template(({ emojiCount, classes, category, pickerId, icon, i18n }) => /* html */`
  <div class="${classes.emojiCategory}" role="tabpanel" aria-labelledby="${pickerId}-category-${category.key}">
  <h3 data-category="${category.key}" class="${classes.categoryName}">
    <i data-icon="${icon}"></i>
    ${i18n.get(`categories.${category.key}`, category.message || category.key)}
    <!-- <button title="<%= i18n.get('recents.clear') %>"><i class="fa-solid fa-lg fa-square-xmark"></i></button> -->
  </h3>
  <div data-empty="${emojiCount === 0}" class="${classes.recentEmojis}">
    <div data-view="emojis" data-render="sync"></div>
  </div>
  <div class="${classes.noRecents}">
    ${i18n.get('recents.none')}
  </div>
</div>
`, { mode: 'async' });

type RecentEmojiCategoryOptions = {
  category: Category;
  lazyLoader?: LazyLoader;
};
export class RecentEmojiCategory extends BaseEmojiCategory {
  emojiContainer: RecentEmojiContainer;

  constructor({ category, lazyLoader }: RecentEmojiCategoryOptions) {
    super({ category, showVariants: false, lazyLoader, template });
  }

  initialize() {
    this.uiElements = {
      ...this.baseUIElements,
      recents: View.byClass(classes.recentEmojis),
      // clearButton: 'button'
    };

    this.appEvents = {
      'recent:add': this.addRecent
    };

    // TODO figure out clear button later
    // this.uiEvents = [
    //   View.childEvent('clearButton', 'click', this.clearRecents)
    // ]

    super.initialize();
  }

  clearRecents() {
    clear();
    this.emojiContainer.el.replaceChildren();
    this.ui.recents.dataset.empty = 'true';
  }

  async addRecent(recent: EmojiRecord) {
    await this.emojiContainer.addOrUpdate(recent);
    this.ui.recents.dataset.empty = 'false';
  }

  async render(): Promise<HTMLElement> {
    const recents = getRecents(this.options.maxRecents);

    this.emojiContainer = this.viewFactory.create(RecentEmojiContainer, {
      emojis: recents,
      showVariants: false,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    });

    return super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: recents.length,
      icon: categoryIcons[this.category.key]
    });
  }
}
