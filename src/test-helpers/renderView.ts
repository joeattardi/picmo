import { AppEvent } from '../AppEvents';
import { Events } from '../events';
import { Bundle } from '../i18n';
import NativeRenderer from '../renderers/native';
import { View } from '../views/view';

const defaults = {
  events: new Events<AppEvent>(),
  renderer: new NativeRenderer(),
  i18n: new Bundle()
};

export async function renderView(view: View, options = {}): Promise<void> {
  const {
    events,
    renderer,
    i18n
  } = {
    ...defaults,
    ...options
  };

  view.setEvents(events);
  view.setRenderer(renderer);
  view.setI18n(i18n);
  view.initialize();

  document.body.replaceChildren(await view.render());
}
