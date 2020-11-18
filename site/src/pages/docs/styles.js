import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import twemojiExample from '!!raw-loader!../../examples/styles/twemoji.js';

export default function StylesExample() {
  return (
    <DocLayout>
      <h1>Styles</h1>
      <p>
        Emoji Button supports two different styles of emojis, controlled by the{' '}
        <code>style</code> option.
      </p>

      <h2>Native</h2>
      <p>
        Uses the native emoji characters built in to the operating system. These
        are the actual Unicode characters. This is the default setting.
      </p>

      <div>
        <Example />
      </div>

      <h2>Twemoji</h2>
      <p>
        Uses Twitter's <a href="https://twemoji.twitter.com">Twemoji</a>{' '}
        library. This is a cross-platform emoji library that uses SVG images in
        place of emoji characters. This is a good choice if you want a
        consistent emoji style on all platforms.
      </p>

      <p>
        To use the Twemoji style, set the <code>style</code> property to{' '}
        <code>twemoji</code> in the options object passed to the{' '}
        <code>EmojiButton</code> constructor.
      </p>

      <p>
        When using Twemoji, you can also optionally pass a{' '}
        <code>twemojiOptions</code>
        object to the <code>EmojiButton</code> options. This will customize how
        Twemoji parses and generates an image URL. For valid Twemoji options,
        see{' '}
        <a href="https://github.com/twitter/twemoji">
          the Twemoji documentation
        </a>
        .
      </p>

      <p>
        When using the Twemoji style, the argument to the <code>emoji</code>{' '}
        event has a <code>url</code> property, which is the URL of the Twemoji
        image corresponding to the emoji that was selected. The{' '}
        <code>emoji</code> property is also present.
      </p>

      <div>
        <Example
          options={{ style: 'twemoji' }}
          initialImageUrl="https://twemoji.maxcdn.com/v/13.0.0/svg/1f60e.svg"
        />
      </div>

      <SourceFile src={twemojiExample} />
    </DocLayout>
  );
}
