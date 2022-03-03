import { View } from './view';

import baseTemplate from 'templates/emojiCategory.ejs';

import { EmojiContainer } from './EmojiContainer';
import { LazyLoader } from '../LazyLoader';

import classes from './EmojiCategory.scss';

type EmojiCategoryOptions = {
  category: string;
  showVariants: boolean;
  emojis: any[];
  lazyLoader?: LazyLoader;
  emojiVersion: string;
  template: string;
};
export class EmojiCategory extends View {
  protected container: HTMLElement;
  private category: string;
  private emojis: any[];
  private lazyLoader?: LazyLoader;
  protected showVariants: boolean;
  protected emojiVersion: string;
  emojiContainer: EmojiContainer;

  constructor({
    category,
    showVariants,
    emojis,
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
    this.emojis = emojis;
    this.lazyLoader = lazyLoader;
    this.emojiVersion = emojiVersion;
  }

  initialize() {
    this.uiElements = {
      categoryName: View.byClass(classes.categoryName)
    };
  }

  async render(): Promise<HTMLElement> {
    this.emojiContainer = this.viewFactory.create(EmojiContainer, {
      emojis: this.emojis || [],
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion
    });

    return super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: this.emojis.length,
      i18n: this.i18n
    });
  }
}
