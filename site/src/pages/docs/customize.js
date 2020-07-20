import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import autoHideExample from '!!raw-loader!../../examples/customize/autoHide.js';
import categoriesExample from '!!raw-loader!../../examples/customize/categories.js';
import sizeExample from '!!raw-loader!../../examples/customize/size.js';
import emojiVersionExample from '!!raw-loader!../../examples/customize/emojiVersion.js';
import initialCategoryExample from '!!raw-loader!../../examples/customize/initialCategory.js';
import hideElementsExample from '!!raw-loader!../../examples/customize/hideElements.js';

export default function CustomizationExample() {
  return (
    <DocLayout>
      <h1>Customization</h1>
      <p>
        Emoji Button's user interface is heavily customizable. Most interface
        elements can be customized or removed altogether. This page will go over
        the various customization options.
      </p>

      <h2>Disable auto-hide</h2>
      <p>
        By default, the picker is hidden when an emoji is selected. This can be
        changed by setting <code>autoHide</code> to <code>false</code>. To hide
        the picker, click anywhere outside of it in the document or call{' '}
        <code>togglePicker</code> or <code>hidePicker</code>.
      </p>
      <Example options={{ autoHide: false }} />
      <SourceFile src={autoHideExample} />

      <h2>Specify categories</h2>
      <p>
        By default, all categories are shown. You can specify a list of
        categories, and the picker will only show those categories. The recents
        category is always included by default, but it can be disabled by
        setting <code>showRecents</code> to <code>false</code>.
      </p>
      <Example options={{ categories: ['smileys', 'flags'] }} />
      <SourceFile src={categoriesExample} />

      <h2>Size customizations</h2>
      <p>
        The emoji size, number of emojis per row, and number of visible rows can
        all be configured.
      </p>
      <Example
        options={{
          emojiSize: '64px',
          emojisPerRow: 4,
          rows: 4
        }}
      />
      <SourceFile src={sizeExample} />

      <h2>Emoji version</h2>
      <p>
        By default, Emoji Button shows all the emojis in the Emoji 12.1
        specification. If desired, an older version of the Emoji specification
        can be used.
      </p>
      <Example options={{ emojiVersion: '1.0' }} />
      <SourceFile src={emojiVersionExample} />

      <h2>Initial category</h2>
      <p>
        By default, the picker starts out showing the Smileys &amp; Emotion
        category. This can be changed if desired.
      </p>
      <Example options={{ initialCategory: 'flags' }} />
      <SourceFile src={initialCategoryExample} />

      <h2>Hiding UI elements</h2>
      <p>
        The various UI elements can be hidden if desired, to create a more
        minimal picker UI.
      </p>
      <Example
        options={{
          showCategoryButtons: false,
          showSearch: false,
          showPreview: false,
          showRecents: false
        }}
      />
      <SourceFile src={hideElementsExample} />
    </DocLayout>
  );
}
