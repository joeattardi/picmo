import React from 'react';
import ReactDOM from 'react-dom/client';

import emojiData from 'emojibase-data/en/data.json';
import messages from 'emojibase-data/en/messages.json';

import { EmojiPicker } from './src';

ReactDOM.createRoot(document.getElementById('picker')).render(
  <React.StrictMode>
    <EmojiPicker emojiData={emojiData} messages={messages} />
  </React.StrictMode>
);
