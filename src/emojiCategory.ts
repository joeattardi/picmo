import { TinyEmitter as Emitter } from 'tiny-emitter';
import { View } from './view';

import baseTemplate from './templates/emojiCategory.ejs';

import { EmojiContainer } from './emojiContainer';
import Bundle from './i18n';
import { LazyLoader } from '.';
import Renderer from './renderers/renderer';

import classes from './emojiCategory.scss';

type EmojiCategoryOptions = {
  category: string;
  showVariants: boolean;
  emojis: any[];
  events: Emitter;
  lazyLoader?: LazyLoader;
  i18n: Bundle;
  renderer: Renderer;
  emojiVersion: string;
  template: string;
};
export class EmojiCategory extends View {
  protected container: HTMLElement;
  private category: string;
  private emojis: any[];
  private i18n: Bundle;
  private lazyLoader?: LazyLoader;
  protected renderer: Renderer;
  protected events: Emitter;
  protected showVariants: boolean;
  protected emojiVersion: string;
  emojiContainer: EmojiContainer;

  uiElements = { categoryName: View.byClass(classes.categoryName)}

  constructor({
    category,
    showVariants,
    emojis,
    events,
    lazyLoader,
    i18n,
    renderer,
    emojiVersion,
    template = baseTemplate
  }: EmojiCategoryOptions) {
    super(template, classes);

    this.category = category;
    this.showVariants = showVariants;
    this.emojis = emojis;
    this.events = events;
    this.lazyLoader = lazyLoader;
    this.i18n = i18n;
    this.renderer = renderer;
    this.emojiVersion = emojiVersion;
  }

  async render(): Promise<HTMLElement> {
    this.emojiContainer = new EmojiContainer({
      emojis: this.emojis || [],
      showVariants: this.showVariants,
      events: this.events,
      lazyLoader: this.lazyLoader,
      renderer: this.renderer,
      i18n: this.i18n,
      emojiVersion: this.emojiVersion
    });

    return super.render({
      category: this.category,
      emojis: await this.emojiContainer.render(),
      emojiCount: this.emojis.length,
      i18n: this.i18n
    });
  }
}
