import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import positionExample from '!!raw-loader!../../examples/position.js';

export default function PositionExample() {
  return (
    <DocLayout>
      <h1>Positioning</h1>
      <p>
        Emoji Button uses the <a href="https://popper.js.org">Popper</a> library
        for positioning the picker. The picker accepts a <code>position</code>{' '}
        option specifying where the picker should be positioned, relative to the
        reference element passed to <code>showPicker</code> or{' '}
        <code>togglePicker</code>. This property can be any of the{' '}
        <code>Placement</code> properties defined in the{' '}
        <a href="https://popper.js.org/docs/v2/constructors/#options">
          Popper documentation
        </a>
        .
      </p>
      <Example options={{ position: 'bottom-start' }} />
      <SourceFile src={positionExample} />
    </DocLayout>
  );
}
