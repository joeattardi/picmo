import React, { useRef, useState, useEffect } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import Layout from '../components/Layout';

export default function Home() {
  const buttonRef = useRef();
  const [picker, setPicker] = useState(null);

  useEffect(() => {
    setPicker(
      new EmojiButton({
        theme: 'auto',
        position: 'bottom-end'
      })
    );
  }, []);

  function togglePicker() {
    picker.togglePicker(buttonRef.current);
  }

  return (
    <Layout>
      <button ref={buttonRef} onClick={togglePicker}>
        😎
      </button>
    </Layout>
  );
}
