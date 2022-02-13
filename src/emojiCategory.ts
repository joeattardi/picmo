import { renderTemplate } from './templates';

import template from './templates/emojiCategory.ejs';

import { EmojiContainer } from './emojiContainer';

export class EmojiCategory {
  protected container: HTMLElement;
  private category: string;
  private emojis;
  private i18n;
  private lazyLoader;
  protected options;
  protected events;
  protected showVariants: boolean;
  protected template;

  constructor(category: string, showVariants: boolean, emojis, events, options, lazyLoader, i18n) {
    this.emojis = emojis;
    this.showVariants = showVariants;
    this.category = category;
    this.events = events;
    this.options = options;
    this.lazyLoader = lazyLoader;
    this.i18n = i18n;

    this.initialize();
  }

  initialize(): void {
    this.template = template;
  }

  async render(): HTMLElement {
    const emojis = await new EmojiContainer(
      this.emojis || [],
      this.showVariants,
      this.events,
      this.options,
      this.lazyLoader,
      this.i18n
    ).render();

    this.container = renderTemplate(this.template, {
      category: this.category,
      emojis,
      emojiCount: this.emojis.length,
      i18n: this.i18n
    });

    return this.container;
  }
}