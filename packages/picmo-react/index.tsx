import React from 'react';
import ReactDOM from 'react-dom/client';

import EmojiPicker from './src/components/EmojiPicker';

ReactDOM.createRoot(document.getElementById('picker') as HTMLElement).render(
  <EmojiPicker />
);
