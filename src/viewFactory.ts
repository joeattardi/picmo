import { Events } from './events';
import { Bundle } from './i18n';
import { Renderer } from './renderers/renderer';
import { View } from './views/view';

type ConstructorFn<T> = new (...args: any[]) => T;

type DependencyMapping = {
  events: Events;
  i18n: Bundle;
  renderer: Renderer;
};

export class ViewFactory {
  private events: Events;
  private i18n: Bundle;
  private renderer: Renderer;

  constructor({ events, i18n, renderer }: DependencyMapping) {
    this.events = events;
    this.i18n = i18n;
    this.renderer = renderer;
  }

  create<T extends View>(constructor: ConstructorFn<T>, ...args: any[]): T {
    const view = new constructor(...args);
    
    view.setEvents(this.events);
    view.setI18n(this.i18n);
    view.setRenderer(this.renderer);

    view.viewFactory = this;
    return view;
  }
}
