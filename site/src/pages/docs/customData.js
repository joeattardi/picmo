import React from 'react';

import frEmojiData from '@roderickhsiao/emoji-button-locale-data/dist/fr';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import customDataExample from '!!raw-loader!../../examples/customData';

export default function CustomData() {
  return (
    <DocLayout>
      <h1>Custom Emoji Data</h1>
      <p>
        Emoji Button ships with English emoji data. If your site or app is in a
        different language, you probably want to use emoji data with translated
        emoji names. This can most easily be done by installing the package{' '}
        <a href="https://www.npmjs.com/package/@roderickhsiao/emoji-button-locale-data">
          @roderickhsiao/emoji-button-locale-data
        </a>
        , which contains emoji translations for many languages.
      </p>

      <div>
        <Example options={{ emojiData: frEmojiData }} />
      </div>

      <SourceFile src={customDataExample} />
    </DocLayout>
  );
}
