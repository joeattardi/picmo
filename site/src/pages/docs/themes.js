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

import highContrastTheme from '!!raw-loader!../../examples/themes/custom.highcontrast.css';
import '../../examples/themes/custom.highcontrast.css';
import highContrastThemeExample from '!!raw-loader!../../examples/themes/highcontrast.js';

import minimalTheme from '!!raw-loader!../../examples/themes/custom.minimal.css';
import '../../examples/themes/custom.minimal.css';
import minimalThemeExample from '!!raw-loader!../../examples/themes/minimal.js';

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

  function setCustom() {
    picker.setTheme({className:'emoji-picker-high-contrast'});
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

        <button
          id="set-theme-custom"
          onClick={setCustom}
        >
          custom
        </button>
      </div>

      <SourceFile src={switchExample} />

      <a name="custom" />
      <h1>Custom Themes</h1>
      <p>
        You can use custom themes by passing an object with a <code>className</code>{' '}
        property specifying the CSS class which contains the custom theme properties, 
        and an optional <code>extends</code> property, specifying the base theme 
        (<code>light</code>, <code>dark</code>, or <code>auto</code>) to extend from.
      </p>

      <h2>Example - High Contrast</h2>
      <p>
        This theme changes every available variable, customizing the entire component.
      </p>
      <Example options={{ theme: {className:'emoji-picker-high-contrast'} }} />
      <SourceFile src={highContrastThemeExample} />
      <pre>
        <code
          className="language-css"
          dangerouslySetInnerHTML={{ __html:highContrastTheme}}
        />
      </pre>

      <h2>Example - Minimal</h2>
      <p>
        If the dark theme generally works for your application, but you'd like to customize a few colors to 
        better match your brand, that's easily done:
      </p>
      <Example options={{ theme: {extends:'dark', className:'emoji-picker-minimal'} }} />
      <SourceFile src={minimalThemeExample} />
      <pre>
        <code
          className="language-css"
          dangerouslySetInnerHTML={{ __html:minimalTheme}}
        />
      </pre>

    </DocLayout>
  );
}
