import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import DocLayout from '../../components/DocLayout';
import SourceFile from '../../components/SourceFile';

import styles from './styles.module.css';

export default function StylesExample() {
  const nativeButtonRef = useRef();
  const [nativePicker, setNativePicker] = useState(null);
  const [nativeEmoji, setNativeEmoji] = useState('😎');

  const twemojiButtonRef = useRef();
  const [twemojiPicker, setTwemojiPicker] = useState(null);
  const [twemoji, setTwemoji] = useState(
    '<img class="emoji" draggable="false" alt="😎" src="https://twemoji.maxcdn.com/v/13.0.0/svg/1f60e.svg">'
  );

  useEffect(() => {
    const pickerObj = new EmojiButton({
      style: 'native'
    });

    pickerObj.on('emoji', selectedEmoji => {
      setNativeEmoji(selectedEmoji);
    });

    setNativePicker(pickerObj);
  }, []);

  useEffect(() => {
    const pickerObj = new EmojiButton({
      style: 'twemoji'
    });

    pickerObj.on('emoji', selectedEmoji => {
      setTwemoji(selectedEmoji);
    });

    setTwemojiPicker(pickerObj);
  }, []);

  function toggleNativePicker() {
    nativePicker.togglePicker(nativeButtonRef.current);
  }

  function toggleTwemojiPicker() {
    twemojiPicker.togglePicker(twemojiButtonRef.current);
  }

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
        <button
          className={styles.emojiButton}
          ref={nativeButtonRef}
          onClick={toggleNativePicker}
        >
          {nativeEmoji}
        </button>
      </div>

      <h2>Twemoji</h2>
      <p>
        Uses Twitter's <a href="https://twemoji.twitter.com">Twemoji</a>{' '}
        library. This is a cross-platform emoji library that uses SVG images in
        place of emoji characters. This is a good choice if you want a
        consistent emoji style on all platforms.
      </p>

      <div>
        <button
          className={styles.emojiButton}
          ref={twemojiButtonRef}
          onClick={toggleTwemojiPicker}
          dangerouslySetInnerHTML={{ __html: twemoji }}
        ></button>
      </div>
    </DocLayout>
  );
}
