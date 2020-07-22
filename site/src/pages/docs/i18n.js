import React from 'react';

import { Link } from 'gatsby';

import DocLayout from '../../components/DocLayout';

export default function I18NExample() {
  const i18nStrings = `
  {
    search: 'Search emojis...',
    categories: {
      recents: 'Recent Emojis',
      smileys: 'Smileys & Emotion',
      people: 'People & Body',
      animals: 'Animals & Nature',
      food: 'Food & Drink',
      activities: 'Activities',
      travel: 'Travel & Places',
      objects: 'Objects',
      symbols: 'Symbols',
      flags: 'Flags',
      custom: 'Custom'
    },
    notFound: 'No emojis found'
}
  `.trim();

  return (
    <DocLayout>
      <h1>I18N Strings</h1>

      <p>
        The emoji picker has several UI strings that default to English. When
        you create the <code>EmojiButton</code> instance, you can pass in an{' '}
        <code>i18n</code> object to the options that contains translated
        strings.
      </p>

      <p>
        The strings are specified in an object with an expected structure. Below
        is a code snippet with the <code>i18n</code> object structure and its
        default values.
      </p>

      <p>The names of individual emojis are currently not localizable.</p>

      <pre>
        <code className="language-javascript">{i18nStrings}</code>
      </pre>
    </DocLayout>
  );
}
