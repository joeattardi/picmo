import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import customExample from '!!raw-loader!../../examples/custom/custom.js';

export default function CustomExample() {
  return (
    <DocLayout>
      <h1>Custom Emojis</h1>
      <p>Emoji Button also supports adding your own custom emojis as images.</p>

      <div>
        <Example
          options={{
            custom: [
              {
                name: 'Conga parrot',
                emoji: '/conga_parrot.gif'
              },
              {
                name: 'O RLY?',
                emoji: '/orly.jpg'
              }
            ]
          }}
        />
      </div>

      <p>
        Custom emojis are specified as an array of objects passed to the{' '}
        <code>custom</code> property of the <code>EmojiButton</code> options.
        Each element of the array is expected to have two properties:
      </p>

      <ul>
        <li>
          <code>name</code>: The display name of the emoji
        </li>
        <li>
          <code>emoji</code>: The URL of the image to use for the custom emoji
        </li>
      </ul>

      <p>
        When a custom emoji is selected, the argument to the <code>emoji</code>{' '}
        event will have a <code>url</code> property just like a Twemoji
        selection. It will also have a <code>custom</code> property set to{' '}
        <code>true</code> to indicate that it is a custom emoji.
      </p>

      <p>
        If you use custom emojis with the native emoji style, you will have to
        differentiate between the images of custom emojis and the emoji
        characters of built-in native emojis, as shown in the example on this
        page.
      </p>

      <SourceFile src={customExample} />
    </DocLayout>
  );
}
