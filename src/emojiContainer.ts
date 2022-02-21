import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Emoji } from './emoji';
import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import classes from './emojiContainer.scss';
import { renderTemplate } from './templates';
import template from './templates/emojiContainer.ejs';
import { LazyLoader } from './lazyLoad';
import Bundle from './i18n';
import Renderer from './renderers/renderer';
import { getEmojiForEvent } from './util';

import { View } from './view';

type EmojiContainerOptions = {
  emojis: any;
  showVariants: boolean;
  events: Emitter;
  lazyLoader?: LazyLoader;
  i18n: Bundle;
  emojiVersion: string;
  renderer: Renderer;
};
export class EmojiContainer extends View {
  container: HTMLElement;
  protected emojis: Array<any>;
  protected showVariants: boolean;
  protected events: Emitter;
  private renderer: Renderer;
  protected lazyLoader?: LazyLoader;
  protected i18n;
  emojiViews: Emoji[];
  emojiElements: HTMLElement[];

  constructor({ emojis, showVariants, events, lazyLoader, i18n, emojiVersion, renderer }: EmojiContainerOptions) {
    super();
    this.showVariants = showVariants;
    this.events = events;
    this.lazyLoader = lazyLoader;
    this.i18n = i18n;
    this.renderer = renderer;

    this.emojis = emojis.filter(e => !e.version || parseFloat(e.version as string) <= parseFloat(emojiVersion));
  }

  uiEvents = [
    View.listen('mouseover', this.showPreview),
    View.listen('mouseout', this.hidePreview),
    View.listen('focus', this.showPreview, { capture: true }),
    View.listen('blur', this.hidePreview, { capture: true }),
    View.listen('click', this.selectEmoji)
  ];

  async doRender(): Promise<HTMLElement> {
    this.emojiViews = this.emojis.map(
      emoji =>
        new Emoji({
          emoji,
          lazyLoader: this.lazyLoader,
          renderer: this.renderer
        })
    );

    this.emojiElements = await Promise.all(this.emojiViews.map(view => view.render()));
    this.container = renderTemplate(template, { classes, emojis: this.emojiElements, i18n: this.i18n });

    return this.container;
  }

  destroy() {
    this.emojiViews.forEach(view => view.destroy());
  }

  private selectEmoji(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojis);
    if (emoji) {
      this.events.emit(EMOJI, {
        emoji,
        showVariants: this.showVariants
      });
    }
  }

  private showPreview(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojis);
    if (emoji) {
      this.events.emit(SHOW_PREVIEW, emoji);
    }
  }

  private hidePreview(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojis);
    if (emoji) {
      this.events.emit(HIDE_PREVIEW);
    }
  }

  get emojiCount(): number {
    return this.emojis.length;
  }
}
