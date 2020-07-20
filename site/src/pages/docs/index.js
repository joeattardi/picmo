import React from 'react';

import DocLayout from '../../components/DocLayout';
import SourceFile from '../../components/SourceFile';

import basicHtml from '!!raw-loader!../../examples/basics/index.html';
import basicJs from '!!raw-loader!../../examples/basics/index.js';

export default function DocIndex() {
  const installation = `
# Using npm
npm install @joeattardi/emoji-button

# Using yarn
yarn add @joeattardi/emoji-button
`.trim();

  return (
    <DocLayout>
      <h1>Documentation</h1>
      <p>
        Emoji Button is a vanilla JavaScript emoji picker component. It displays
        a panel of emojis where one can be selected. What is done with the
        selected emoji is up to you.
      </p>

      <h1>Installation</h1>
      <p>
        Emoji Button is published as an npm package, and can be installed with
        npm or Yarn.
      </p>

      <pre>
        <code className="language-bash">{installation}</code>
      </pre>

      <h1>Basic usage</h1>
      <p>
        First, you'll need a trigger element. This is typically a button, and is
        used to toggle the emoji picker.
      </p>

      <SourceFile src={basicHtml} />

      <p>
        Once you've added the trigger, you need to import the{' '}
        <code>EmojiButton</code> class and create a new instance. Various
        options can be passed to the constructor, which will be shown in future
        examples.
      </p>

      <SourceFile src={basicJs} />

      <p>
        To show the picker, call <code>showPicker</code> or{' '}
        <code>togglePicker</code> on the <code>EmojiButton</code> instance. The
        picker will appear and the user can select an emoji. When an emoji is
        selected, the <code>EmojiButton</code> instance will emit an{' '}
        <code>emoji</code> event. You can listen for this event by calling{' '}
        <code>on</code> on the instance, and then handle the selected emoji
        however you want.
      </p>

      <p>
        When the picker is visible, there are several ways it can be closed:
      </p>

      <ul>
        <li>
          Select an emoji (unless the <code>autoHide</code> option is set to{' '}
          <code>false</code>)
        </li>
        <li>Click anywhere outside of the picker</li>
        <li>Press the Escape key</li>
        <li>
          Call the <code>hidePicker</code> or <code>togglePicker</code> methods
          on the picker instance.
        </li>
      </ul>

      <p>
        The <code>showPicker</code> and <code>togglePicker</code> methods expect
        a reference element as their first argument. The reference element is
        used to calculate the picker's position on screen. The picker will be
        positioned relative to the reference element.
      </p>

      <p>
        The argument to the <code>emoji</code> will be an object with an{' '}
        <code>emoji</code> property, which contains the selected emoji
        character. You can then handle this emoji as you see fit.
      </p>
    </DocLayout>
  );
}
