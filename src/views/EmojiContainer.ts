import { Emoji } from './Emoji';
import classes from './EmojiContainer.scss';
import template from '../templates/emojiContainer.ejs';
import { LazyLoader } from '../LazyLoader';
import { getEmojiForEvent } from '../util';
import { View } from './view';
import { EmojiRecord } from '../types';
import { FocusGrid, FocusChangeEvent } from '../focusGrid';

type EmojiContainerOptions = {
  emojis: EmojiRecord[];
  showVariants: boolean;
  preview: boolean;
  lazyLoader?: LazyLoader;
};

/**
 * An EmojiContainer contains all the emojis in a given category.
 */
export class EmojiContainer extends View {
  protected emojis: EmojiRecord[];
  protected showVariants: boolean;
  protected preview: boolean;
  protected lazyLoader?: LazyLoader;
  emojiViews: Emoji[];
  emojiElements: HTMLElement[];

  private grid: FocusGrid;

  constructor({ emojis, showVariants, preview = true, lazyLoader }: EmojiContainerOptions) {
    super({ template, classes });

    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
    this.preview = preview;
    this.emojis = emojis;

    this.setFocus = this.setFocus.bind(this);
  }

  initialize() {
    this.grid = new FocusGrid(this.options.emojisPerRow, this.emojiCount);
    this.grid.on('focus:change', this.setFocus);

    this.uiEvents = [
      View.uiEvent('click', this.selectEmoji),
      View.uiEvent('keydown', this.grid.handleKeyDown)
    ];

    if (this.preview) {
      this.uiEvents.push(
        View.uiEvent('mouseover', this.showPreview),
        View.uiEvent('mouseout', this.hidePreview),
        View.uiEvent('focus', this.showPreview, { capture: true }),
        View.uiEvent('blur', this.hidePreview, { capture: true })
      );
    }

    super.initialize();
  }

  setActive(active: boolean, focus: boolean) {
    const focusedIndex = this.grid.getIndex();
    if (active) {
      this.emojiViews[focusedIndex].activateFocus(focus);
    } else {
      this.emojiViews[focusedIndex].deactivateFocus();
    }
  }

  async render(): Promise<HTMLElement> {
    this.emojiViews = this.emojis.map(emoji =>
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

  private setFocus({ from, to }: FocusChangeEvent) {
    this.emojiViews[from].deactivateFocus();
    this.emojiViews[to].activateFocus(true);
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
