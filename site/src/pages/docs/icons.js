import React from 'react';

import DocLayout from '../../components/DocLayout';
import Example from '../../components/Example';
import SourceFile from '../../components/SourceFile';

import customIconsExample from '!!raw-loader!../../examples/customIcons.js';

export default function IconsExample() {
  return (
    <DocLayout>
      <h1>Custom Icons</h1>
      <p>
        If the icons built in to Emoji Button don't go well with your app's look
        and feel, you can supply your own icons for:
      </p>

      <ul>
        <li>The search icon</li>
        <li>The clear search icon</li>
        <li>The category icons</li>
        <li>The "not found" icon</li>
      </ul>

      <p>
        To use custom icons, pass the <code>icons</code> picker option and an
        object with one or more of the following properties:
      </p>

      <ul>
        <li>
          <code>search</code>: Shown in the search bar when there is no search
          text entered.
        </li>
        <li>
          <code>clearSearch</code>: Shown in the search bar when there is search
          text entered.
        </li>
        <li>
          <code>notFound</code>: Shown along with a "not found" message when a
          search yields no emojis.
        </li>
        <li>
          <code>categories</code>: A nested object mapping category IDs to their
          custom icons. The valid category IDs are:
          <ul>
            <li>
              <code>recents</code>
            </li>
            <li>
              <code>smileys</code>
            </li>
            <li>
              <code>people</code>
            </li>
            <li>
              <code>animals</code>
            </li>
            <li>
              <code>food</code>
            </li>
            <li>
              <code>activities</code>
            </li>
            <li>
              <code>travel</code>
            </li>
            <li>
              <code>objects</code>
            </li>
            <li>
              <code>symbols</code>
            </li>
            <li>
              <code>flags</code>
            </li>
            <li>
              <code>custom</code>
            </li>
          </ul>
        </li>
      </ul>

      <Example
        options={{
          icons: {
            search: '/search.svg',
            clearSearch: '/close.svg'
          }
        }}
      />
      <SourceFile src={customIconsExample} />
    </DocLayout>
  );
}
