import { Emoji } from './Emoji';
import classes from './EmojiContainer.scss';
import template from 'templates/emojiContainer.ejs';
import { LazyLoader } from '../LazyLoader';
import { getEmojiForEvent } from '../util';
import { View } from './view';

type EmojiContainerOptions = {
  emojis: any;
  showVariants: boolean;
  lazyLoader?: LazyLoader;
};
export class EmojiContainer extends View {
  protected emojis: Array<any>; // TODO use proper types after using emojibase
  protected showVariants: boolean;
  protected lazyLoader?: LazyLoader;
  emojiViews: Emoji[];
  emojiElements: HTMLElement[];

  constructor({ emojis, showVariants, lazyLoader }: EmojiContainerOptions) {
    super({ template, classes });

    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;

    this.emojis = emojis;
  }

  initialize() {
      this.uiEvents = [
        View.uiEvent('mouseover', this.showPreview),
        View.uiEvent('mouseout', this.hidePreview),
        View.uiEvent('focus', this.showPreview, { capture: true }),
        View.uiEvent('blur', this.hidePreview, { capture: true }),
        View.uiEvent('click', this.selectEmoji)
      ];
  }

  async render(): Promise<HTMLElement> {
    this.emojiViews = this.emojis.map(
      emoji =>
        this.viewFactory.create(Emoji, {
          emoji,
          lazyLoader: this.lazyLoader,
          renderer: this.renderer
        })
    );

    this.emojiElements = await Promise.all(this.emojiViews.map(view => view.render()));

    return super.render({
      emojis: this.emojiElements,
      i18n: this.i18n
    });
  }

  destroy() {
    super.destroy();
    this.emojiViews.forEach(view => view.destroy());
  }

  private selectEmoji(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojis);
    if (emoji) {
      this.events.emit('emoji:select', {
        emoji,
        showVariants: this.showVariants
      });
    }
  }

  private showPreview(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojis);
    if (emoji) {
      this.events.emit('preview:show', emoji);
    }
  }

  private hidePreview(event: Event) {
    const emoji = getEmojiForEvent(event, this.emojis);
    if (emoji) {
      this.events.emit('preview:hide');
    }
  }

  get emojiCount(): number {
    return this.emojis.length;
  }
}
