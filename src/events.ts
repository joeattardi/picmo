import { TinyEmitter } from 'tiny-emitter';

export type AsyncEventCallback = (...args: any[]) => Promise<void>;
export type EventCallback = (...args: any[]) => void;
export type EventArgs = any[];

type EventHandlerRecord = {
  event: AppEvent;
  handler: EventCallback;
}

export type AppEvent = 
  'content:show' |
  'emoji:select' |
  'preview:show' |
  'preview:hide' |
  'variantPopup:hide' |
  'category:select' |
  'recent:add'

export class Events {
  private handlers: EventHandlerRecord[] = [];
  private emitter = new TinyEmitter();

  on(event: AppEvent, handler: EventCallback) {
    this.emitter.on(event, handler);
    this.handlers.push({ event, handler });
  }

  emit(event: AppEvent, ...args: EventArgs) {
    this.emitter.emit(event, ...args);
  }

  removeAll() {
    this.handlers.forEach(({ event, handler }) => {
      this.emitter.off(event, handler);
    });

    this.handlers = [];
  }
}
