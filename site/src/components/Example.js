import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import styles from './Example.module.css';

export default function Example({
  initialEmoji = '😎',
  initialImageUrl,
  options
}) {
  const buttonRef = useRef();
  const [picker, setPicker] = useState(null);
  const [emoji, setEmoji] = useState(initialEmoji);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  useEffect(() => {
    const pickerObj = new EmojiButton(options);

    pickerObj.on('emoji', selection => {
      setEmoji(selection.emoji);
      setImageUrl(selection.url);
    });

    setPicker(pickerObj);
  }, []);

  function togglePicker() {
    picker.togglePicker(buttonRef.current);
  }

  return (
    <button
      className={styles.emojiButton}
      ref={buttonRef}
      onClick={togglePicker}
    >
      {imageUrl ? <img alt={emoji} src={imageUrl} /> : <span>{emoji}</span>}
    </button>
  );
}
