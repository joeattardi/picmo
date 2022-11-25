import React from 'react';
import ReactDOM from 'react-dom/client';

import emojiData from 'emojibase-data/en/data.json';
import messages from 'emojibase-data/en/messages.json';

import { themes, EmojiPicker } from './src';

ReactDOM.createRoot(document.getElementById('picker')).render(
  <EmojiPicker emojiData={emojiData} messages={messages} />
);
