import { ViewConstructor, ViewConstructorParameters, ViewFactory } from '../src/viewFactory';
import { View } from '../src/views/view';

import { Events } from '../src/events';
import { AppEvent } from '../src/AppEvents';
import { Bundle } from '../src/i18n/bundle';
import { NativeRenderer } from '../src/renderers/native';
import { Database } from '../src/db';

import { getOptions } from '../src/options';

jest.mock('../src/db');

const defaultDependencies = {
  events: new Events<AppEvent>(),
  i18n: new Bundle(),
  renderer: new NativeRenderer(),
  options: getOptions({ i18n: {} }),
  emojiData: Promise.resolve(new Database()),
  customEmojis: [],
  pickerId: 'test-picker'
};

function createTestView<T extends View>(
  constructor: ViewConstructor<T>,
  args: ViewConstructorParameters<T>,
  dependencies = {}
) {
  const factory = new ViewFactory({ ...defaultDependencies, ...dependencies });
  const view = factory.create(constructor, ...args);
  return view;
}

export async function testView<T extends View>(
  constructor: ViewConstructor<T>,
  args: ViewConstructorParameters<T>,
  dependencies = {}
) {
  const view = createTestView(constructor, args, dependencies);
  document.body.appendChild(await view.render());
  return view;
}

export function testViewSync<T extends View>(
  constructor: ViewConstructor<T>,
  args: ViewConstructorParameters<T>,
  dependencies = {}
) {
  const view = createTestView(constructor, args, dependencies);
  document.body.appendChild(view.renderSync());
  return view;
}
