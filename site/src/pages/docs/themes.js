import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import lightExample from '!!raw-loader!../../examples/themes/light.js';
import darkExample from '!!raw-loader!../../examples/themes/dark.js';
import autoExample from '!!raw-loader!../../examples/themes/auto.js';

export default function ThemesEcxample() {
  return (
    <DocLayout>
      <h1>Themes</h1>
      <p>
        Like many operating systems, Emoji Button supports both a light and a
        dark theme. An automatic theme is also available, which will use the
        appropriate theme depending on the operating system's current setting.
      </p>

      <h2>Light</h2>
      <p>
        The light theme is the default. To use the light theme, specify{' '}
        <code>light</code> as the value of the <code>theme</code> option, or
        don't specify an option at all.
      </p>
      <Example options={{ theme: 'light' }} />
      <SourceFile src={lightExample} />

      <h2>Dark</h2>
      <p>
        To use the dark theme, specify <code>dark</code> as the value of the{' '}
        <code>theme</code> option.
      </p>
      <Example options={{ theme: 'dark' }} />
      <SourceFile src={darkExample} />

      <h2>Automatic</h2>
      <p>
        To use the automatic theme, specify <code>auto</code> as the value of
        the <code>theme</code> option.
      </p>
      <Example options={{ theme: 'auto' }} />
      <SourceFile src={autoExample} />
    </DocLayout>
  );
}
