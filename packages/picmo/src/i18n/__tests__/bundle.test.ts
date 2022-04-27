import { Bundle } from '../bundle';

describe('i18n Bundle', () => {
  test('gets an existing value from the map', () => {
    const i18n = new Bundle({ hello: 'Hello' });
    expect(i18n.get('hello')).toBe('Hello');
  });

  test('returns the key back if it was not found in the map', () => {
    const i18n = new Bundle({});
    expect(i18n.get('hello')).toBe('hello');
  });
});
