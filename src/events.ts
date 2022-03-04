import { TinyEmitter } from 'tiny-emitter';

export type AsyncEventCallback = (...args: any[]) => Promise<void>;
export type EventCallback = (...args: any[]) => void;
export type EventArgs = any[];

export type EventKey<T> = Extract<T, string>;

export type EventHandlerRecord<T> = {
  event: EventKey<T>;
  handler: EventCallback;
}

export class Events<T> {
  private handlers: EventHandlerRecord<T>[] = [];
  private emitter = new TinyEmitter();

  on(event: EventKey<T>, handler: EventCallback) {
    this.emitter.on(event, handler);
    this.handlers.push({ event, handler });
  }

  emit(event: EventKey<T>, ...args: EventArgs) {
    this.emitter.emit(event, ...args);
  }

  removeAll() {
    this.handlers.forEach(({ event, handler }: EventHandlerRecord<T>) => {
      this.emitter.off(event, handler);
    });

    this.handlers = [];
  }
}
