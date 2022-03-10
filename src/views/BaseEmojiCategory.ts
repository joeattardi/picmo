import { View } from './view';

import classes from './EmojiCategory.scss';
import { Category } from '../types';
import { LazyLoader } from '../LazyLoader';
import { EmojiContainer } from './EmojiContainer';

type BaseEmojiCategoryOptions = {
  category: Category;
  showVariants: boolean;
  lazyLoader?: LazyLoader;
  template: string;
}

export abstract class BaseEmojiCategory extends View {
  protected category: Category;
  protected showVariants: boolean;
  protected lazyLoader?: LazyLoader;
  protected emojiContainer: EmojiContainer;

  constructor({ template, category, showVariants, lazyLoader }: BaseEmojiCategoryOptions) {
    super({ template, classes });

    this.category = category;
    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
  }

  initialize() {
    this.uiElements = {
      categoryName: View.byClass(classes.categoryName)
    };
  }
}
