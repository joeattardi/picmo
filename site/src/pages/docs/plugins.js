import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import DocLayout from '../../components/DocLayout';
import SourceFile from '../../components/SourceFile';

import pluginExample from '!!raw-loader!../../examples/plugin.js';

import styles from './plugins.module.css';

export default function PluginsExample() {
  const buttonRef = useRef();
  const [picker, setPicker] = useState(null);
  const [emoji, setEmoji] = useState(null);

  useEffect(() => {
    const removePlugin = {
      render(picker) {
        const button = document.createElement('button');
        button.innerHTML = 'Remove';
        button.addEventListener('click', () => {
          setEmoji(null);
          picker.hidePicker();
        });

        return button;
      }
    };

    const pickerObj = new EmojiButton({
      plugins: [removePlugin]
    });
    pickerObj.on('emoji', selection => setEmoji(selection.emoji));
    setPicker(pickerObj);
  }, []);

  function togglePicker() {
    picker.togglePicker(buttonRef.current);
  }

  return (
    <DocLayout>
      <h1>Plugins</h1>
      <p>You can extend the emoji picker's UI using plugins.</p>

      <p>
        A plugin is a JavaScript object with a property called{' '}
        <code>render</code>. The value of that property should be a function
        that takes in the picker instance as its sole parameter. The return
        value of the <code>render</code> function should be an{' '}
        <code>HTMLElement</code> that contain the user interface for the plugin.
      </p>

      <p>
        A plugin can also optionally define a <code>destroy</code> function
        which will be called when the picker is destroyed, which can be used to
        perform any necessary cleanup.
      </p>

      <p>
        Plugins are passed as an array into the <code>plugins</code> picker
        option. The plugins will be rendered at the top of the picker.
      </p>

      <p>
        In the example on this page, we show a blank button until an emoji is
        chosen. We have a plugin that adds a "Remove" button to the picker. If
        that button is clicked, it removes the current emoji selection and
        closes the picker.
      </p>

      <div>
        <button
          className={styles.emojiButton}
          ref={buttonRef}
          onClick={togglePicker}
        >
          {emoji}
        </button>
      </div>

      <SourceFile src={pluginExample} />
    </DocLayout>
  );
}
