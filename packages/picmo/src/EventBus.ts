import { EmojiRecord } from './types';

export type Events = {
  'emoji:select': [EmojiRecord];
  'preview:clear': [];
  'preview:show': [EmojiRecord, Node];
  'recents:update': [];
  search: [string];
};

export type EventKey = keyof Events;

type EventBinding<Event extends EventKey> = {
  context?: any;
  handler: (...args: Events[Event]) => any;
  once?: boolean;
};

export class EventBus {
  private subscriptions = new Map<EventKey, EventBinding<EventKey>[]>();

  private getSubscriptionsFor<Event extends EventKey>(event: EventKey) {
    let results = this.subscriptions.get(event);
    if (!results) {
      results = [];
      this.subscriptions.set(event, results);
    }

    return results as EventBinding<Event>[];
  }

  register<Event extends EventKey>(event: Event, handler: (...args: Events[Event]) => any, context?: any, once = false) {
    const subscriptions = this.getSubscriptionsFor<Event>(event);
    subscriptions.push({
      context,
      handler,
      once
    } as EventBinding<Event>);
  }

  dispatch<Event extends EventKey>(event: Event, ...args: Events[Event]) {
    const subscriptions = this.getSubscriptionsFor(event);
    subscriptions.forEach(subscription => {
      subscription.handler.apply(subscription.context, args);
      // TODO: handle once
    });
  }

  unregister<Event extends EventKey>(event: Event, handler: (...args: Events[Event]) => any) {
    const subscriptions = this.getSubscriptionsFor(event);
    this.subscriptions.set(event, subscriptions.filter(h => h.handler !== handler));
  }
}
