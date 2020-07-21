import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import positionExample from '!!raw-loader!../../examples/position.js';
import fixedPositionExample from '!!raw-loader!../../examples/fixedPosition.js';

export default function PositionExample() {
  return (
    <DocLayout>
      <h1>Positioning</h1>

      <h2>Relative positioning</h2>
      <p>
        Emoji Button uses the <a href="https://popper.js.org">Popper</a> library
        for relative positioning of the picker. The picker accepts a{' '}
        <code>position</code> option specifying where the picker should be
        positioned, relative to the reference element passed to{' '}
        <code>showPicker</code> or <code>togglePicker</code>. This property can
        be any of the <code>Placement</code> properties defined in the{' '}
        <a href="https://popper.js.org/docs/v2/constructors/#options">
          Popper documentation
        </a>
        .
      </p>
      <Example options={{ position: 'bottom-start' }} />
      <SourceFile src={positionExample} />

      <h2>Fixed positioning</h2>
      <p>
        A fixed position can also be given for the <code>position</code> option.
        In this case, <code>position</code> is an object with <code>top</code>,{' '}
        <code>bottom</code>, <code>left</code>, and/or <code>right</code>{' '}
        properties. Only one is required.
      </p>

      <Example options={{ position: { top: '0', right: '0' } }} />
      <SourceFile src={fixedPositionExample} />
    </DocLayout>
  );
}
