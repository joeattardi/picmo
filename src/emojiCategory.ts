import { TinyEmitter as Emitter } from 'tiny-emitter';

import { renderTemplate } from './templates';

import template from './templates/emojiCategory.ejs';

import { EmojiContainer } from './emojiContainer';
import Bundle from './i18n';
import { LazyLoader } from '.';
import Renderer from './renderers/renderer';

type EmojiCategoryOptions = {
  category: string;
  showVariants: boolean;
  emojis: any[];
  events: Emitter;
  lazyLoader?: LazyLoader;
  i18n: Bundle;
  renderer: Renderer;
  emojiVersion: string;
};
export class EmojiCategory {
  protected container: HTMLElement;
  private category: string;
  private emojis: any[];
  private i18n: Bundle;
  private lazyLoader?: LazyLoader;
  protected renderer: Renderer;
  protected events: Emitter;
  protected showVariants: boolean;
  protected template: string;
  protected emojiVersion: string;

  constructor({
    category,
    showVariants,
    emojis,
    events,
    lazyLoader,
    i18n,
    renderer,
    emojiVersion
  }: EmojiCategoryOptions) {
    this.category = category;
    this.showVariants = showVariants;
    this.emojis = emojis;
    this.events = events;
    this.lazyLoader = lazyLoader;
    this.i18n = i18n;
    this.renderer = renderer;
    this.emojiVersion = emojiVersion;

    this.initialize();
  }

  initialize(): void {
    this.template = template;
  }

  async render(): Promise<HTMLElement> {
    const emojis = await new EmojiContainer({
      emojis: this.emojis || [],
      showVariants: this.showVariants,
      events: this.events,
      lazyLoader: this.lazyLoader,
      renderer: this.renderer,
      i18n: this.i18n,
      emojiVersion: this.emojiVersion
    }).render();

    this.container = renderTemplate(this.template, {
      category: this.category,
      emojis,
      emojiCount: this.emojis.length,
      i18n: this.i18n
    });

    return this.container;
  }
}
