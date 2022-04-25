export type AsyncEventCallback = (...args: any[]) => Promise<void>;
export type EventCallback = (...args: any[]) => void;
export type EventArgs = any[];

export type EventKey<T> = Extract<T, string>;

export type EventBinding = {
  context?: any;
  handler: EventCallback;
  once?: boolean;
};

export type EventHandlerRecord<T> = {
  event: EventKey<T>;
  handler: EventCallback;
};

export class Events<T> {
  #events: Map<string, EventBinding[]> = new Map();
  
  #getBindings(event: EventKey<T>): EventBinding[] {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }

    return this.#events.get(event) as EventBinding[];
  }

  #addListener(event: EventKey<T>, handler: EventCallback, context?: any, once = false) {
    const bindings = this.#getBindings(event);
    bindings.push({ context, handler, once });
  }

  on(event: EventKey<T>, handler: EventCallback, context?: any) {
    this.#addListener(event, handler, context);
  }

  once(event: EventKey<T>, handler: EventCallback, context?: any) {
    this.#addListener(event, handler, context, true);
  }

  off(event: EventKey<T>, handler: EventCallback) {
    const bindings = this.#getBindings(event);
    this.#events.set(event, bindings.filter(h => h.handler !== handler));
  }

  emit(event: EventKey<T>, ...args: EventArgs) {
    const bindings = this.#getBindings(event);
    bindings.forEach((binding: EventBinding) => {
      binding.handler.apply(binding.context, args);
      if (binding.once) {
        this.off(event, binding.handler);
      }
    });
  }

  removeAll() {
    this.#events.clear();
  }
}
