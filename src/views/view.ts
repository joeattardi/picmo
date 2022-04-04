import { Data } from 'ejs';

import { renderTemplateSync, renderTemplate, ElementTemplate } from '../templates';
import { AppEvent, AppEventKey } from '../AppEvents';
import { Events, EventArgs, EventCallback, AsyncEventCallback } from '../events';
import { ViewFactory } from '../viewFactory';
import { Bundle } from '../i18n';
import { Renderer } from '../renderers/renderer';
import { Database } from '../db';
import { EmojiRecord, PickerOptions } from '../types';
import { shouldAnimate } from '../util';

type UIEventListenerBinding = {
  target?: string;
  event: string;
  handler: EventCallback;
  options?: AddEventListenerOptions;
};

type KeyBindings = Record<string, (KeyboardEvent?) => void>;

type AppEvents = {
  [key in AppEvent]?: EventCallback | AsyncEventCallback;
};

type ClassMappings = Record<string, string>;
type UIElementSelectors = Record<string, string>;
type UIElementMappings = Record<string, HTMLElement>;
type Template = string | ElementTemplate;

type ViewOptions = {
  template: Template;
  classes?: ClassMappings;
  parent?: HTMLElement;
};
export abstract class View {
  el: HTMLElement;
  isDestroyed = false;

  private template: Template;
  private classes?: ClassMappings;

  protected appEvents: AppEvents = {};
  protected uiEvents: UIEventListenerBinding[] = [];
  protected keyBindings: KeyBindings;
  protected uiElements: UIElementSelectors = {};
  protected emojiData: Database;
  protected emojiDataPromise: Promise<Database>;
  protected options: PickerOptions;
  protected customEmojis: EmojiRecord[];

  protected events: Events<AppEvent>;
  protected i18n: Bundle;
  protected renderer: Renderer;
  protected pickerId: string;

  protected parent?: HTMLElement;

  viewFactory: ViewFactory;

  ui: UIElementMappings = {};

  constructor({ template, classes, parent }: ViewOptions) {
    this.template = template;
    this.classes = classes;
    this.parent = parent;
  }

  initialize() {
    this.bindAppEvents();
  }

  setCustomEmojis(customEmojis: EmojiRecord[]) {
    this.customEmojis = customEmojis;
  }

  setEvents(events: Events<AppEvent>) {
    this.events = events;
  }

  setPickerId(pickerId: string) {
    this.pickerId = pickerId;
  }

  emit(event: AppEventKey, ...args: EventArgs) {
    this.events.emit(event, ...args);
  }

  setI18n(i18n: Bundle) {
    this.i18n = i18n;
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  setEmojiData(emojiDataPromise: Promise<Database>) {
    this.emojiDataPromise = emojiDataPromise;
    emojiDataPromise.then(emojiData => {
      this.emojiData = emojiData;
    });
  }

  setOptions(options: PickerOptions) {
    this.options = options;
  }

  animateShow?: () => Promise<Animation | void | Animation[] | (Animation | void)[] >;

  renderSync(templateData: Data = {}): HTMLElement {
    const templateFn =
      typeof this.template === 'string' ? (data: Data) => renderTemplateSync(this.template as string, data) : this.template;

    this.el = templateFn({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...templateData
    }) as HTMLElement;

    this.postRender();
    return this.el;
  }

  async render(templateData: Data = {}): Promise<HTMLElement> {
    await this.emojiDataPromise;

    const templateFn =
      typeof this.template === 'string' ? async (data: Data) => await renderTemplate(this.template as string, data) : this.template;

    this.el = await templateFn({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...templateData
    });

    this.postRender();
    return this.el;
  }

  private postRender() {
    this.bindUIElements();
    this.bindKeyBindings();
    this.bindUIEvents();
    this.scheduleShowAnimation();
  }

  private bindAppEvents() {
    Object.keys(this.appEvents).forEach(event => {
      this.events.on(event as AppEventKey, this.appEvents[event].bind(this));
    });
  }

  private bindKeyBindings() {
    if (this.keyBindings) {
      this.el.addEventListener('keydown', (event: KeyboardEvent) => {
        const handler = this.keyBindings[event.key];
        if (handler) {
          handler.call(this, event);
        }
      });
    }
  }

  private bindUIElements() {
    this.ui = Object.keys(this.uiElements).reduce((result, key) => ({
      ...result,
      [key]: this.el.querySelector<HTMLElement>(this.uiElements[key])
    }), {});
  }

  private bindUIEvents() {
    this.uiEvents.forEach((binding: UIEventListenerBinding) => {
      binding.handler = binding.handler.bind(this);

      const target = binding.target ? this.ui[binding.target] : this.el;
      target.addEventListener(binding.event, binding.handler, binding.options);
    });
  }

  destroy() {
    this.uiEvents.forEach((binding: UIEventListenerBinding) => {
      this.el.removeEventListener(binding.event, binding.handler, binding.options);
    });

    this.el.remove();
    this.isDestroyed = true;
  }

  private scheduleShowAnimation() {
    if (this.parent) {
      const observer = new MutationObserver(list => {
        const [record] = list;
        if (record.type === 'childList' && record.addedNodes[0] === this.el) {
          if (shouldAnimate(this.options) && this.animateShow) {
            this.animateShow();
          }
          observer.disconnect
        }
      });

      observer.observe(this.parent as Node, { childList: true });
    }
  }

  static childEvent(target: string, event: string, handler: EventCallback, options: AddEventListenerOptions = {}): UIEventListenerBinding {
    return { target, event, handler, options };
  }

  static uiEvent(event: string, handler: EventCallback, options: AddEventListenerOptions = {}): UIEventListenerBinding {
    return { event, handler, options };
  }

  static byClass(className: string): string {
    return `.${className}`;
  }
}

export function renderSyncToBody(view: View) {
  document.body.appendChild(view.renderSync());
}

export async function renderToBody(view: View) {
  document.body.appendChild(await view.render());
}
