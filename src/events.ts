import { TinyEmitter } from 'tiny-emitter';

export type EventCallback = (...args: unknown[]) => void;
export type EventHandler = (...args: unknown[]) => void;
export type EventArgs = unknown[];

type EventHandlerRecord = {
  event: AppEvent;
  handler: EventHandler;
}

export type AppEvent = 
  'emoji:select' |
  'searchResults:show' |
  'searchResults:hide' |
  'preview:show' |
  'preview:hide' |
  'variantPopup:hide' |
  'category:select' |
  'recent:add'

export class Events {
  private handlers: EventHandlerRecord[] = [];
  private emitter = new TinyEmitter();

  on(event: AppEvent, handler: EventHandler) {
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
