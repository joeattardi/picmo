import { EmojiRecord } from './types';

export type Events = {
  'emoji:select': (emoji: EmojiRecord) => void,
  // 'test:event': never
};

export type EventKey = keyof Events;
type Handler<T extends EventKey> = (...args: Parameters<Events[T]>) => ReturnType<Events[T]>;

export class EventBus {
  private subscriptions = new Map();

  private getSubscriptionsFor(event: EventKey) {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, []);
    }

    return this.subscriptions.get(event);
  }

  register<T extends EventKey>(event: T, handler: Handler<T>) {
    const subscriptions = this.getSubscriptionsFor(event);
    subscriptions.push(handler);
  }

  dispatch<T extends EventKey>(event: T, ...args: Parameters<Events[T]>) {
    const subscriptions = this.getSubscriptionsFor(event);
    subscriptions.forEach(handler => {
      handler(...args);
    });
  }
}
