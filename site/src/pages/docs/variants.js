import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import noVariantsExample from '!!raw-loader!../../examples/noVariants.js';

export default function VariantsExample() {
  return (
    <DocLayout>
      <h1>Variants</h1>
      <p>
        Some emojis have skin tone variants. When an emoji is selected in the
        picker that has variants, a variant popup will appear so the user can
        select the desired variant.
      </p>

      <img src="/variants.png" />

      <p>
        If you do not want to use emoji variants, set the{' '}
        <code>showVariants</code> option to <code>false</code>.
      </p>

      <Example options={{ showVariants: false }} />
      <SourceFile src={noVariantsExample} />
    </DocLayout>
  );
}
