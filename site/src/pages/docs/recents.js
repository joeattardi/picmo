import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import limitRecentsExample from '!!raw-loader!../../examples/recents/limitRecents.js';
import hideRecentsExample from '!!raw-loader!../../examples/recents/hideRecents.js';

export default function RecentsExample() {
  return (
    <DocLayout>
      <h1>Recent Emojis</h1>
      <p>
        Emoji Button will remember the most recently used emojis. This data is
        stored in the browser's local storage under the key{' '}
        <code>emojiPicker.recent</code>.
      </p>

      <h2>Recent count</h2>
      <p>
        By default, the 50 most recent emojis are saved. This number can be
        changed by specifying the <code>recentsCount</code> property in the
        picker options.
      </p>
      <Example options={{ recentsCount: 5 }} />
      <SourceFile src={limitRecentsExample} />

      <h2>Hiding recents</h2>
      <p>
        The Recent Emojis category can be hidden if desired by setting{' '}
        <code>showRecents</code> to <code>false</code> in the picker options.
      </p>
      <Example options={{ showRecents: false }} />
      <SourceFile src={hideRecentsExample} />
    </DocLayout>
  );
}
