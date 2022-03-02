import { Data } from 'ejs';

import { renderTemplate, ElementTemplate } from './templates';
import { AppEvent, Events, EventArgs } from './events';
import { ViewFactory } from './viewFactory';
import { Bundle } from './i18n';
import { Renderer } from './renderers/renderer';

type EventHandler = (event: Event) => void;

type EventListenerBinding = {
  event: string;
  handler: EventHandler;
  options: AddEventListenerOptions;
};

type ClassMappings = { [key: string]: string };

type UIElementSelectors = { [key: string]: string };

type UIElementMappings = { [key: string]: HTMLElement };
type Template = string | ElementTemplate;

export abstract class View {
  el: HTMLElement;

  private template: Template;
  private classes: ClassMappings;

  protected appEvents = {};
  protected uiEvents: EventListenerBinding[] = [];
  protected uiElements: UIElementSelectors = {};

  protected events: Events;
  protected i18n: Bundle;
  protected renderer: Renderer;

  viewFactory: ViewFactory;

  ui: UIElementMappings = {};

  constructor(template: Template, classes: ClassMappings = {}) {
    this.template = template;
    this.classes = classes;
  }

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
      typeof this.template === 'string' ? (data: Data) => renderTemplate(this.template as string, data) : this.template;

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

  static listen(event, handler, options = {}) {
    return { event, handler, options };
  }

  static byClass(className: string): string {
    return `.${className}`;
  }
}
