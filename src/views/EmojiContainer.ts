import { Emoji } from './Emoji';
import classes from './EmojiContainer.scss';
import template from '../templates/emojiContainer.ejs';
import { LazyLoader } from '../LazyLoader';
import { getEmojiForEvent } from '../util';
import { View } from './view';
import { CategoryKey, EmojiFocusTarget, EmojiRecord } from '../types';
import { FocusGrid, FocusChangeEvent } from '../focusGrid';

type EmojiContainerOptions = {
  emojis: EmojiRecord[];
  showVariants: boolean;
  preview: boolean;
  lazyLoader?: LazyLoader;
  category?: CategoryKey;
};

/**
 * An EmojiContainer contains all the emojis in a given category.
 * 
 * It manages keybaord focus for all emojis in the category.
 */
export class EmojiContainer extends View {
  protected emojis: EmojiRecord[];
  protected showVariants: boolean;
  protected preview: boolean;
  protected lazyLoader?: LazyLoader;
  private category?: CategoryKey;
  private grid: FocusGrid;
  emojiViews: Emoji[];
  emojiElements: HTMLElement[];

  constructor({ emojis, showVariants, preview = true, lazyLoader, category }: EmojiContainerOptions) {
    super({ template, classes });

    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
    this.preview = preview;
    this.emojis = emojis;
    this.category = category;

    this.setFocus = this.setFocus.bind(this);
    this.triggerNextCategory = this.triggerNextCategory.bind(this);
    this.triggerPreviousCategory = this.triggerPreviousCategory.bind(this);
  }

  initialize() {
    this.grid = new FocusGrid(this.options.emojisPerRow, this.emojiCount);
    this.grid.on('focus:change', this.setFocus);
    this.grid.on('focus:overflow', this.triggerNextCategory);
    this.grid.on('focus:underflow', this.triggerPreviousCategory);

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

  /**
   * Marks the specified cell in the emoji grid as focused.
   * 
   * @param focusTarget The target emoji to make focusable.
   * @param performFocus Whether or not to actually focus the new target.
   */
  private setFocusedView(focusTarget: EmojiFocusTarget | undefined, performFocus?: boolean): void {
    if (!focusTarget) {
      return;
    }

    if (focusTarget.row === 'first') {
      this.grid.setCell(0, focusTarget.offset, performFocus);
    } else if (focusTarget.row === 'last') {
      this.grid.setCell(this.grid.getRowCount() - 1, focusTarget.offset, performFocus);
    }
  }

  /**
   * Sets the active state of this category's emojis. If a category is active, its emojis
   * are focusable.
   * 
   * @param active the desired active state
   * @param focusTarget the target emoji to make focusable if active is true
   * @param performFocus whether or not to actually focus the new target if active is true
   */
  setActive(active: boolean, focusTarget?: EmojiFocusTarget, performFocus?: boolean) {
    if (active) {
      this.setFocusedView(focusTarget, performFocus);
    } else {
      this.emojiViews[this.grid.getIndex()].deactivateFocus();
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
    this.grid.destroy();
  }

  /**
   * Causes the previous category to become active/focusable due to a focus:underflow event.
   * @param column the currently focused column
   */
  private triggerPreviousCategory(column: number) {
    this.events.emit('category:previous', column);
  }

  /**
   * Causes the next category to become active/focusable due to a focus:overflow event.
   * @param column the currently focused column
   */
  private triggerNextCategory(column: number) {
    this.events.emit('category:next', column);
  }

  /**
   * Reacts to a focus:change event from the grid.
   * 
   * The current emoji is deactivated, and the new emoji is activated.
   * An event is then emitted which will pause the scroll listener in the main emoji area,
   * otherwise the active category tab can get out of sync.
   * 
   * @param event The focus:change event.
   */
  private setFocus({ from, to, performFocus }: FocusChangeEvent) {
    this.emojiViews[from].deactivateFocus();
    this.emojiViews[to].activateFocus(performFocus);
    this.events.emit('focus:change', this.category);
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
