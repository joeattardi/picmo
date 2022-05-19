import { AppEvent } from './AppEvents';
import { DataStore } from './data/DataStore';
import { Events } from './events';
import { Bundle } from './i18n/bundle';
import { Renderer } from './renderers/renderer';
import { PickerOptions, EmojiRecord } from './types';
import { View } from './views/view';

type DependencyMapping = {
  events: Events<AppEvent>;
  i18n: Bundle;
  renderer: Renderer;
  emojiData: Promise<DataStore>;
  options: PickerOptions;
  customEmojis: EmojiRecord[];
  pickerId: string;
};

export type ViewConstructor<T extends View> = new (...args: any[]) => T;
export type ViewConstructorParameters<T extends View> = ConstructorParameters<ViewConstructor<T>>;

export class ViewFactory {
  private events: Events<AppEvent>;
  private i18n: Bundle;
  private renderer: Renderer;
  private emojiData: Promise<DataStore>;
  private options: PickerOptions;
  private customEmojis: EmojiRecord[];
  private pickerId: string;

  constructor({ events, i18n, renderer, emojiData, options, customEmojis = [], pickerId }: DependencyMapping) {
    this.events = events;
    this.i18n = i18n;
    this.renderer = renderer;
    this.emojiData = emojiData;
    this.options = options;
    this.customEmojis = customEmojis;
    this.pickerId = pickerId;
  }

  setEmojiData(emojiData: DataStore) {
    this.emojiData = Promise.resolve(emojiData);
  }

  create<T extends View>(constructor: ViewConstructor<T>, ...args: ViewConstructorParameters<T>): T {
    const view = new constructor(...args);
    
    view.setPickerId(this.pickerId);
    view.setEvents(this.events);
    view.setI18n(this.i18n);
    view.setRenderer(this.renderer);
    view.setEmojiData(this.emojiData);
    view.setOptions(this.options);
    view.setCustomEmojis(this.customEmojis);

    view.viewFactory = this;

    view.initialize();
    return view;
  }
}
