import { View } from './view';

import baseTemplate from 'templates/emojiCategory.ejs';

import { EmojiContainer } from './EmojiContainer';
import { LazyLoader } from '../LazyLoader';

import classes from './EmojiCategory.scss';
import { Category } from '../types';

type EmojiCategoryOptions = {
  category: Category;
  showVariants: boolean;
  lazyLoader?: LazyLoader;
  emojiVersion: string;
  template: string;
};
export class EmojiCategory extends View {
  protected container: HTMLElement;
  private category: Category;
  private lazyLoader?: LazyLoader;
  protected showVariants: boolean;
  protected emojiVersion: string;
  emojiContainer: EmojiContainer;

  constructor({
    category,
    showVariants,
    lazyLoader,
    emojiVersion,
    template = baseTemplate
  }: EmojiCategoryOptions) {
    super({
      template,
      classes
    });

    this.category = category;
    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
    this.emojiVersion = emojiVersion;
  }

  initialize() {
    this.uiElements = {
      categoryName: View.byClass(classes.categoryName)
    };
  }

  async render(): Promise<HTMLElement> {
    const emojis = await this.emojiData.getEmojis(this.category);

    this.emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis: emojis || [],
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion
    });

    return super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: emojis.length,
      i18n: this.i18n
    });
  }
}
