import { Data } from 'ejs';

import { renderTemplate, ElementTemplate } from './templates';

type EventHandler = (event: Event) => void;

type EventListenerBinding = {
  event: string;
  handler: EventHandler;
  options: AddEventListenerOptions;
};

type ClassMappings = { [key: string]: string };

type UIElementSelector = {
  selector: string;
  name: string;
};

type UIElementMappings = { [key: string]: HTMLElement };
type Template = string | ElementTemplate;

export abstract class View {
  el: HTMLElement;

  private template: Template;
  private classes: ClassMappings;

  uiEvents: EventListenerBinding[] = [];
  uiElements: UIElementSelector[] = [];
  ui: UIElementMappings = {};

  constructor(template: Template, classes: ClassMappings = {}) {
    this.template = template;
    this.classes = classes;
  }

  async render(templateData: Data = {}): Promise<HTMLElement> {
    const templateFn =
      typeof this.template === 'string' ? (data: Data) => renderTemplate(this.template as string, data) : this.template;

    this.el = await templateFn({
      classes: this.classes,
      ...templateData
    });

    this.bindListeners();
    this.bindUIElements();

    return this.el;
  }

  private bindUIElements() {
    this.uiElements.forEach(({ selector, name }: UIElementSelector) => {
      const element = this.el.querySelector<HTMLElement>(selector);
      if (element) {
        this.ui[name] = element;
      }
    });
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

  static byClass(className: string, name: string) {
    return { selector: `.${className}`, name };
  }
}
