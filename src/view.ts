type EventHandler = (event: Event) => void;

type EventListenerBinding = {
  event: string;
  handler: EventHandler;
  options: AddEventListenerOptions;
};

export function listen(
  event: string,
  handler: EventHandler,
  options: AddEventListenerOptions = {}
): EventListenerBinding {
  return { event, handler, options };
}

export abstract class View {
  el: HTMLElement;
  abstract doRender(): Promise<HTMLElement>;
  uiEvents: EventListenerBinding[] = [];

  async render(): Promise<HTMLElement> {
    this.el = await this.doRender();
    this.bindListeners();
    return this.el;
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
}
