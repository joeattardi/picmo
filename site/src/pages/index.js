import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import Layout from '../components/Layout';

import styles from './index.module.css';

export default function Home() {
  const buttonRef = useRef();
  const [picker, setPicker] = useState(null);
  const [emoji, setEmoji] = useState('😎');

  useEffect(() => {
    const pickerObj = new EmojiButton({
      theme: 'auto',
      position: 'bottom-end'
    });

    pickerObj.on('emoji', selectedEmoji => {
      setEmoji(selectedEmoji);
    });

    setPicker(pickerObj);
  }, []);

  function togglePicker() {
    picker.togglePicker(buttonRef.current);
  }

  return (
    <Layout>
      <h2>Demo</h2>
      <section>
        <p>Click the button to select a new emoji.</p>
        <button
          className={styles.emojiButton}
          ref={buttonRef}
          onClick={togglePicker}
        >
          {emoji}
        </button>
      </section>

      <h2>Features</h2>
      <section>
        <h3>Vanilla JavaScript</h3>
        <p>
          Emoji Button doesn't rely on a particular framework, allowing you to
          use it in any JavaScript app.
        </p>

        <h3>Native or Twemoji styles</h3>
        <p>
          Use the operating system's built-in emoji characters, or use the
          cross-platform <a href="https://twemoji.twitter.com">Twemoji</a> emoji
          library.
        </p>

        <h3>Emoji search</h3>
        <p>Search for emojis by name.</p>

        <h3>Emoji variations</h3>
        <p>
          Some emojis support skin tone, or other types of, variations. Emoji
          Button fully supports these variations.
        </p>

        <h3>Recent emojis</h3>
        <p>Remembers the previously/frequently selected emojis.</p>

        <h3>Keyboard accessibility</h3>
        <p>
          No mouse required! Navigate the picker with the Tab and arrow keys.
        </p>

        <h3>Themes</h3>
        <p>
          Includes a dark and light theme. Also supports automatically setting
          the theme based on the user's operating system settings.
        </p>
      </section>

      <h2>Compatibility</h2>
      <section>
        <p>
          Emoji Button works with all modern browsers. Internet Explorer is not
          supported.
        </p>
      </section>
    </Layout>
  );
}
