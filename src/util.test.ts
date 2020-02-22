import * as util from './util';

describe('Utils', () => {
  describe('getEmojiName', () => {
    test('should use a string name', () => {
      expect(util.getEmojiName({
        n: 'foobar',
        e: '😎',
        k: 'foobar'
      })).toEqual('foobar');
    });

    test('should use the first element of an array of names', () => {
      expect(util.getEmojiName({
        n: ['one', 'two'],
        e: '😎',
        c: 0,
        ver: '0.0'
      })).toEqual('one');
    });
  });

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
