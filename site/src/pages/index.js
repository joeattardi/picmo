import React, { useRef, useState, useEffect } from 'react';

import { faJs } from '@fortawesome/free-brands-svg-icons';
import {
  faKeyboard,
  faHistory,
  faPalette,
  faSearch,
  faSmile,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { EmojiButton } from '@joeattardi/emoji-button';
import Prism from 'prismjs';

import Feature from '../components/Feature';
import Layout from '../components/Layout';
import SourceFile from '../components/SourceFile';

import indexExample from '!!raw-loader!../examples/index';

import styles from './index.module.css';

export default function Home() {
  const buttonRef = useRef();
  const [picker, setPicker] = useState(null);
  const [emoji, setEmoji] = useState('😎');

  useEffect(() => {
    Prism.highlightAll();
  }, []);

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

      <SourceFile src={indexExample} />

      <h2>Features</h2>
      <section>
        <Feature icon={faJs} title="Vanilla JavaScript">
          Emoji Button doesn't rely on a particular framework, allowing you to
          use it in any JavaScript app.
        </Feature>

        <Feature icon={faSmile} title="Native or Twemoji styles">
          Use the operating system's built-in emoji characters, or use the
          cross-platform <a href="https://twemoji.twitter.com">Twemoji</a> emoji
          library.
        </Feature>

        <Feature icon={faSearch} title="Emoji search">
          Search for emojis by name.
        </Feature>

        <Feature icon={faThumbsUp} title="Emoji variations">
          Some emojis support skin tone, or other types of, variations. Emoji
          Button fully supports these variations.
        </Feature>

        <Feature icon={faHistory} title="Recent emojis">
          Remembers the previously/frequently selected emojis.
        </Feature>

        <Feature icon={faKeyboard} title="Keyboard accessible">
          No mouse required! Navigate the picker with the Tab and arrow keys.
        </Feature>

        <Feature icon={faPalette} title="Themes">
          Includes a dark and light theme. Also supports automatically setting
          the theme based on the user's operating system settings.
        </Feature>
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
