import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import lightExample from '!!raw-loader!../../examples/themes/light.js';
import darkExample from '!!raw-loader!../../examples/themes/dark.js';
import autoExample from '!!raw-loader!../../examples/themes/auto.js';
import switchExample from '!!raw-loader!../../examples/themes/switch-theme.js';

import styles from './plugins.module.css';

export default function ThemesExample() {
  
  const buttonRef = useRef();
  const [picker, setPicker] = useState(null);
  const [emoji, setEmoji] = useState("😎");

  useEffect(() => {
    const pickerObj = new EmojiButton({});
    pickerObj.on('emoji', selection => setEmoji(selection.emoji));
    setPicker(pickerObj);
  }, []);

  function togglePicker() {
    picker.togglePicker(buttonRef.current);
  }

  function setDark() {
    picker.setTheme("dark");
  }

  function setLight() {
    picker.setTheme("light");
  }

  function setAuto() {
    picker.setTheme("auto");
  }

  return (
    <DocLayout>
      <h1>Themes</h1>
      <p>
        Like many operating systems, Emoji Button supports both a light and a
        dark theme. An automatic theme is also available, which will use the
        appropriate theme depending on the operating system's current setting.
      </p>

      <h2>Light</h2>
      <p>
        The light theme is the default. To use the light theme, specify{' '}
        <code>light</code> as the value of the <code>theme</code> option, or
        don't specify an option at all.
      </p>
      <Example options={{ theme: 'light' }} />
      <SourceFile src={lightExample} />

      <h2>Dark</h2>
      <p>
        To use the dark theme, specify <code>dark</code> as the value of the{' '}
        <code>theme</code> option.
      </p>
      <Example options={{ theme: 'dark' }} />
      <SourceFile src={darkExample} />

      <h2>Automatic</h2>
      <p>
        To use the automatic theme, specify <code>auto</code> as the value of
        the <code>theme</code> option.
      </p>
      <Example options={{ theme: 'auto' }} />
      <SourceFile src={autoExample} />

      <h1>Switching the theme</h1>
      <p>
        To switch the theme after construction, call <code>setTheme</code>{' '}
        on the <code>EmojiButton</code> instance, passing it a value 
        of <code>light</code>,<code>dark</code>, or <code>auto</code>.
      </p>

      <div>
        <button
          className={styles.emojiButton}
          ref={buttonRef}
          onClick={togglePicker}
        >
          {emoji}
        </button>

        <button
          id="set-theme-dark"
          onClick={setDark}
        >
          dark
        </button>

        <button
          id="set-theme-light"
          onClick={setLight}
        >
          light
        </button>

        <button
          id="set-theme-auto"
          onClick={setAuto}
        >
          auto
        </button>
      </div>

      <SourceFile src={switchExample} />
    </DocLayout>
  );
}
