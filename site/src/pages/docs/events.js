import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import styles from '../../components/Example.module.css';

import DocLayout from '../../components/DocLayout';
import SourceFile from '../../components/SourceFile';

import emojiExample from '!!raw-loader!../../examples/events/emoji.js';
import hiddenExample from '!!raw-loader!../../examples/events/hidden.js';

function EventExample({
  initialEmoji = '😎',
  initialImageUrl,
  options,
  event,
  eventCallback
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

    pickerObj.on(event,eventCallback);

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

function onEmoji(selection)
{
  alert(`"emoji" event fired, emoji is ${selection.emoji}`);
}

function onHidden()
{
  alert('"hidden" event fired');
}

export default function Events() {
  return (
    <DocLayout>
      <h1>Events</h1>
      
      <p>
        The <code>EmojiButton</code> class emits the following events:
      </p>
      
      <h2>
        <code>emoji</code>
      </h2>
      <p>
        Fired when an emoji is selected. The callback will receive a single
        object with one or more of the following properties:
      </p>
      <ul>
        <li>
          <code>custom</code>: This will be <code>true</code> for a custom
          emoji.
        </li>
        <li>
          <code>emoji</code>: The Unicode emoji character that was selected.
          This will be included for native and Twemoji emojis, but not for
          custom emojis.
        </li>
        <li>
          <code>name</code>: The name of the emoji that was selected.
        </li>
        <li>
          <code>url</code>: The URL of the emoji image. This will be included
          for Twemoji and custom emojis.
        </li>
      </ul>
      <EventExample event="emoji" eventCallback={onEmoji}/>
      <SourceFile src={emojiExample} />

      <h2>
        <code>hidden</code>
      </h2>
      <p>
        Fired when the picker is hidden.
      </p>
      <EventExample event="hidden" eventCallback={onHidden}/>
      <SourceFile src={hiddenExample} />

    </DocLayout>
  );
}
