import { Data } from 'ejs';

import { renderTemplate, ElementTemplate } from '../templates';
import { AppEvent, Events, EventArgs, EventCallback, AsyncEventCallback } from '../events';
import { ViewFactory } from '../viewFactory';
import { Bundle } from '../i18n';
import { Renderer } from '../renderers/renderer';

type EventListenerBinding = {
  event: string;
  handler: EventCallback;
  options?: AddEventListenerOptions;
};

type AppEvents = {
  [key in AppEvent]?: EventCallback | AsyncEventCallback;
};

type ClassMappings = { [key: string]: string };
type UIElementSelectors = { [key: string]: string };
type UIElementMappings = { [key: string]: HTMLElement };
type Template = string | ElementTemplate;

type ViewOptions = {
  template: Template;
  classes?: ClassMappings;
};
export abstract class View {
  el: HTMLElement;

  private template: Template;
  private classes?: ClassMappings;

  protected appEvents: AppEvents = {};
  protected uiEvents: EventListenerBinding[] = [];
  protected uiElements: UIElementSelectors = {};

  protected events: Events;
  protected i18n: Bundle;
  protected renderer: Renderer;

  viewFactory: ViewFactory;

  ui: UIElementMappings = {};

  constructor({ template, classes }: ViewOptions) {
    this.template = template;
    this.classes = classes;

    this.initialize();
  }

  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  initialize() {}

  setEvents(events: Events) {
    this.events = events;

    Object.keys(this.appEvents).forEach(event => {
      this.events.on(event as AppEvent, this.appEvents[event].bind(this));
    });
  }

  emit(event: AppEvent, ...args: EventArgs) {
    this.events.emit(event, ...args);
  }

  setI18n(i18n: Bundle) {
    this.i18n = i18n;
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  async render(templateData: Data = {}): Promise<HTMLElement> {
    const templateFn =
      typeof this.template === 'string' ? async (data: Data) => await renderTemplate(this.template as string, data) : this.template;

    this.el = await templateFn({
      classes: this.classes,
      i18n: this.i18n,
      ...templateData
    });

    this.bindListeners();
    this.bindUIElements();

    return this.el;
  }

  private bindUIElements() {
    this.ui = Object.keys(this.uiElements).reduce((result, key) => ({
      ...result,
      [key]: this.el.querySelector<HTMLElement>(this.uiElements[key])
    }), {});
  }

  private bindListeners() {
    this.uiEvents.forEach((binding: EventListenerBinding) => {
      binding.handler = binding.handler.bind(this);

      this.el.addEventListener(binding.event, binding.handler, binding.options);
    });
  }

  destroy() {
    this.uiEvents.forEach((binding: EventListenerBinding) => {
      this.el.removeEventListener(binding.event, binding.handler, binding.options);
    });
  }

  static uiEvent(event, handler, options = {}) {
    return { event, handler, options };
  }

  static byClass(className: string): string {
    return `.${className}`;
  }
}
