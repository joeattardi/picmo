import React, { useRef, useState, useEffect } from 'react';

import { faJs } from '@fortawesome/free-brands-svg-icons';
import {
  faCat,
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

    pickerObj.on('emoji', selection => {
      setEmoji(selection.emoji);
    });

    setPicker(pickerObj);
  }, []);

  function togglePicker() {
    picker.togglePicker(buttonRef.current);
  }

  return (
    <Layout>
      <div className={styles.index}>
        <h2>Demo</h2>
        <section className={styles.demo}>
          <div>
            <button
              className={styles.emojiButton}
              ref={buttonRef}
              onClick={togglePicker}
            >
              {emoji}
            </button>
          </div>
          <div className={styles.code}>
            <SourceFile src={indexExample} />
          </div>
        </section>

        <h2>About</h2>
        <section>
          <p>
            Emoji Button lets you add an emoji picker to your website or app
            with a few simple lines of code. It supports all Unicode emojis up
            to and including Emoji 12.1, and is fully customizable.
          </p>
        </section>

        <section>
          <Feature icon={faJs} title="Vanilla JavaScript">
            Emoji Button doesn't rely on a particular framework, allowing you to
            use it in any JavaScript app.
          </Feature>

          <Feature icon={faSmile} title="Native or Twemoji styles">
            Uses the operating system's built-in emoji characters or the
            cross-platform <a href="https://twemoji.twitter.com">Twemoji</a>{' '}
            emoji library.
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

          <Feature icon={faCat} title="Custom emojis">
            Add your own custom images and GIFs to the emoji picker.
          </Feature>
        </section>

        <h2>Compatibility</h2>
        <section>
          <p>
            Emoji Button works with all modern browsers. Internet Explorer is
            not supported.
          </p>
        </section>
      </div>
    </Layout>
  );
}
