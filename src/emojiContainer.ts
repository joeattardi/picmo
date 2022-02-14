import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';

import { renderTemplate } from './templates';
import template from './templates/emojiContainer.ejs';
import { LazyLoader } from './lazyLoad';
import Bundle from './i18n';
import Renderer from './renderers/renderer';

type EmojiContainerOptions = {
  emojis: any;
  showVariants: boolean;
  events: Emitter;
  lazyLoader?: LazyLoader;
  i18n: Bundle;
  emojiVersion: string;
  renderer: Renderer;
};
export class EmojiContainer {
  protected container: HTMLElement;
  protected emojis: Array<any>;
  protected showVariants: boolean;
  protected events: Emitter;
  private renderer: Renderer;
  protected lazy = false;
  protected lazyLoader?: LazyLoader;
  protected template: string;
  protected i18n;

  constructor({ emojis, showVariants, events, lazyLoader, i18n, emojiVersion, renderer }: EmojiContainerOptions) {
    this.showVariants = showVariants;
    this.events = events;
    this.lazyLoader = lazyLoader;
    this.template = template;
    this.i18n = i18n;
    this.renderer = renderer;

    this.emojis = emojis.filter(e => !e.version || parseFloat(e.version as string) <= parseFloat(emojiVersion));

    this.initialize();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize(): void {}

  async render(): Promise<HTMLElement> {
    const emojis = await Promise.all(
      this.emojis.map(emoji =>
        new Emoji({
          emoji,
          showVariants: this.showVariants,
          showPreview: true,
          events: this.events,
          lazyLoader: this.lazyLoader,
          renderer: this.renderer
        }).render()
      )
    );

    this.container = renderTemplate(this.template, { emojis, i18n: this.i18n });
    return this.container;
  }
}
