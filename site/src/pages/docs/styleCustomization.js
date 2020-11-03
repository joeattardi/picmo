import React from 'react';

import { Link } from 'gatsby';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import customExample from '!!raw-loader!../../examples/styleCustomization.js';

export default function StyleCustomizationExample() {
  return (
    <DocLayout>
      <h1>Style Customization</h1>
      <p>
        Emoji Button uses CSS variables for its styling. You can override any of
        these variables by including them in the <code>styleProperties</code>{' '}
        option. This option is a set of keys and values mapping CSS variable
        names to their values.
      </p>

      <p>
        See <Link to="/docs/cssVariables">CSS Variables</Link> for a list of
        variables that can be overridden.
      </p>

      <div>
        <Example
          options={{
            styleProperties: {
              '--font': 'Courier New',
              '--category-button-color': 'red'
            }
          }}
        />
        <SourceFile src={customExample} />
      </div>
    </DocLayout>
  );
}
