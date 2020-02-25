import * as util from './util';

describe('Utils', () => {
  describe('formatEmojiName', () => {
    test('should format a dash-separated name', () => {
      expect(util.formatEmojiName('foo-bar-baz')).toEqual('Foo bar baz');
    });

    test('should format an underscore-separated name', () => {
      expect(util.formatEmojiName('foo_bar_baz')).toEqual('Foo bar baz');
    });

    test('should format a name separated by dashes and underscores', () => {
      expect(util.formatEmojiName('foo_bar-baz')).toEqual('Foo bar baz');
    });
  });
});
