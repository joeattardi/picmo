import React from 'react';

import DocLayout from '../../components/DocLayout';

export default function CssVariables() {
  return (
    <DocLayout>
      <h1>CSS Variables</h1>

      <p>
        The following CSS variables are supported via the
        <code>styleProperties</code> picker option. There are other CSS
        variables, but overriding them may cause unexpected results.
      </p>

      <h2>
        <code>--background-color</code>
      </h2>
      <p>The background color of the picker.</p>

      <h2>
        <code>--category-button-color</code>
      </h2>
      <p>The color of the category buttons.</p>

      <h2>
        <code>--category-button-active-color</code>
      </h2>
      <p>The color of the active category button.</p>

      <h2>
        <code>--font</code>
      </h2>
      <p>The font to use for all UI elements in the picker.</p>

      <h2>
        <code>--font-size</code>
      </h2>
      <p>The base font size to use for all UI elements in the picker.</p>

      <h2>
        <code>--hover-color</code>
      </h2>
      <p>The background color when hovering over an emoji.</p>

      <h2>
        <code>--secondary-text-color</code>
      </h2>
      <p>The secondary text color.</p>

      <h2>
        <code>--text-color</code>
      </h2>
      <p>The primary text color.</p>
    </DocLayout>
  );
}
