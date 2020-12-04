import React from 'react';

import { Link } from 'gatsby';

import DocLayout from '../../components/DocLayout';

import styles from './api.module.css';

export default function ApiDocs() {
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

  const importExample =
    "import { EmojiButton } from '@joeattardi/emoji-button';";

  return (
    <DocLayout>
      <div className={styles.api}>
        <h1>API Documentation</h1>

        <h2>
          <code>EmojiButton</code> Class
        </h2>
        <p>
          The <code>EmojiButton</code> class creates and controls an emoji
          picker instance. It is a named export from the{' '}
          <code>@joeattardi/emoji-button</code> module. It can be imported as
          follows:
        </p>

        <code>{importExample}</code>

        <h3>
          <code>EmojiButton(options)</code>
        </h3>
        <p>
          The constructor for the <code>EmojiButton</code> class. Accepts an
          optional <code>options</code> parameter, which is an object specifying
          any desired options (shown below).
        </p>

        <p>Supported options are:</p>

        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <code>autoHide</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>
                Whether or not the picker should be automatically hidden when an
                emoji is selected.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>autoFocusSearch</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>
                Whether or not to automatically focus the search field when the
                picker is shown.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>categories</code>
              </th>
              <td>string array</td>
              <td>all categories</td>
              <td>
                An array of the categories to include in the picker. See{' '}
                <a href="#categories">Category IDs</a> for a list of valid
                values.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>custom</code>
              </th>
              <td>custom emoji definition array</td>
              <td>none</td>
              <td>
                An array of the custom emojis to add to the Custom category.
                Each element of the array should have two properties:
                <ul>
                  <li>
                    <code>name</code>: The custom emoji's display name.
                  </li>
                  <li>
                    <code>emoji</code>: The URL (absolute or relative) of the
                    custom emoji image.
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>emojiData</code>
              </th>
              <td>object</td>
              <td>Built-in emoji data</td>
              <td>
                The custom emoji data to use. This is typically used for
                providing translated emoji names, such as from the{' '}
                <a href="https://www.npmjs.com/package/@roderickhsiao/emoji-button-locale-data">
                  @roderickhsiao/emoji-button-locale-data
                </a>{' '}
                package.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>emojiSize</code>
              </th>
              <td>string</td>
              <td>
                <code>'1.8em'</code>
              </td>
              <td>
                The size to use for the emoji icons. This can be any valid CSS
                size expression.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>emojisPerRow</code>
              </th>
              <td>number</td>
              <td>
                <code>8</code>
              </td>
              <td>
                The number of emojis to display per row. If this is set to a
                number smaller than 6, the picker will be so narrow that some of
                the category buttons will be cut off. In this case, it is
                advisable to set <code>showCategoryButtons</code> to{' '}
                <code>false</code>.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>emojiVersion</code>
              </th>
              <td>string</td>
              <td>
                <code>'12.1'</code>
              </td>
              <td>
                The version of the Emoji specification to use. This determines
                which emojis are available in the picker. Valid values are:
                <ul>
                  <li>
                    <code>'1.0'</code>
                  </li>
                  <li>
                    <code>'2.0'</code>
                  </li>
                  <li>
                    <code>'3.0'</code>
                  </li>
                  <li>
                    <code>'4.0'</code>
                  </li>
                  <li>
                    <code>'5.0'</code>
                  </li>
                  <li>
                    <code>'11.0'</code>
                  </li>
                  <li>
                    <code>'12.0'</code>
                  </li>
                  <li>
                    <code>'12.1'</code>
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>i18n</code>
              </th>
              <td>object</td>
              <td>
                See <a href="#i18n">I18N Strings</a>.
              </td>
              <td>
                An object containing localized messages to display in the UI.
                See <a href="#i18n">I18N Strings</a> for the object format and
                default values.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>icons</code>
              </th>
              <td>icon definition object</td>
              <td>none</td>
              <td>
                The custom icons, if any, to use. The object provided must be an{' '}
                <a href="#iconDefinitions">icon definition object</a>. Not all
                properties have to be provided - only the icons you want to
                override.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>initialCategory</code>
              </th>
              <td>string</td>
              <td>
                <code>'smileys'</code>
              </td>
              <td>
                The ID of the category to show initially when the picker is
                shown. See <a href="#categories">Category IDs</a> for a list of
                valid category IDs.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>plugins</code>
              </th>
              <td>plugin definition array</td>
              <td>none</td>
              <td>
                An array of plugins to use with the picker. See{' '}
                <Link to="/docs/plugins">Plugins</Link> for more details. A
                plugin is an object containing the following functions:
                <ul>
                  <li>
                    <code>render(picker)</code>: Renders the UI for the plugin.
                  </li>
                  <li>
                    <code>destroy</code> (optional): Performs any necessary
                    cleanup for the plugin when the picker is destroyed.
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>position</code>
              </th>
              <td>string or object</td>
              <td>
                <code>'auto'</code>
              </td>
              <td>
                The position of the picker relative to the reference element.
                This can either be a string correpsonding to one of the Popper
                options, or an object with <code>top</code>, <code>bottom</code>
                , <code>left</code>, and/or <code>right</code> for fixed
                positioning. See{' '}
                <a href="https://popper.js.org/docs/v2/constructors/#options">
                  the Popper documentation
                </a>{' '}
                for a list of valid relative position values.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>recentsCount</code>
              </th>
              <td>number</td>
              <td>
                <code>50</code>
              </td>
              <td>The number of recent emojis to save.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>rootElement</code>
              </th>
              <td>HTML element reference</td>
              <td>
                <code>document.body</code>
              </td>
              <td>The root DOM node to attach the picker element to.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>rows</code>
              </th>
              <td>number</td>
              <td>
                <code>6</code>
              </td>
              <td>The number of visible rows in the picker.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>showAnimation</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>Whether or not to show animations in the picker.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>showCategoryButtons</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>
                Whether or not to show the category buttons. If{' '}
                <code>emojisPerRow</code> is 6 or less, it is recommended to set
                this to <code>false</code>.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>showPreview</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>Whether or not to show the preview area.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>showSearch</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>Whether or not to show the search field.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>showRecents</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>
                Whether or not to show (and save) recently selected emojis.
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>showVariants</code>
              </th>
              <td>boolean</td>
              <td>
                <code>true</code>
              </td>
              <td>Whether or not to support emoji skin tone variants.</td>
            </tr>

            <tr>
              <th scope="row">
                <code>style</code>
              </th>
              <td>string</td>
              <td>
                <code>'native'</code>
              </td>
              <td>
                The style to use for the emojis. Valid styles are:
                <ul>
                  <li>
                    <code>'native'</code>: Use the operating system's native
                    emoji characters.
                  </li>
                  <li>
                    <code>'twemoji'</code>: Use the cross-platform Twemoji
                    images.
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>theme</code>
              </th>
              <td>string</td>
              <td>
                <code>'light'</code>
              </td>
              <td>
                The theme to use for the picker. Valid themes are:
                <ul>
                  <li>
                    <code>'light'</code>: Use the light theme.
                  </li>
                  <li>
                    <code>'dark'</code>: Use the dark theme.
                  </li>
                  <li>
                    <code>'auto'</code>: Use the operating system setting.
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>twemojiOptions</code>
              </th>
              <td>object</td>
              <td>
                <code>{"{ ext: 'svg', folder: 'svg' }"}</code>
              </td>
              <td>
                The options to pass to Twemoji when using the Twemoji style. For
                a list of valid options, see the{' '}
                <a href="https://github.com/twitter/twemoji">
                  Twemoji documentation
                </a>
                .
              </td>
            </tr>

            <tr>
              <th scope="row">
                <code>zIndex</code>
              </th>
              <td>number</td>
              <td>none</td>
              <td>
                If specified, sets the Z-index for the emoji picker element.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>
          Method: <code>destroyPicker()</code>
        </h3>
        <p>
          Destroys the picker and removes it from the DOM. You will no longer be
          able to show the picker after it is destroyed.
        </p>

        <h3>
          Method: <code>hidePicker()</code>
        </h3>
        <p>Hides the picker.</p>

        <h3>
          Method: <code>isPickerVisible()</code>
        </h3>
        <p>
          Returns <code>true</code> if the picker is currently visible,{' '}
          <code>false</code> if not.
        </p>

        <h3>
          Method: <code>off(event, callback)</code>
        </h3>
        <p>
          Removes the given listener for the given event. See{' '}
          <Link to="/docs/events">Events</Link> for a list of valid events.
        </p>

        <h3>
          Method: <code>on(event, callback)</code>
        </h3>
        <p>
          Adds a listener for the given event. See{' '}
          <Link to="/docs/events">Events</Link> for a list of valid events.
        </p>

        <h3>
          Method: <code>showPicker(referenceElement)</code>
        </h3>
        <p>
          Shows the picker, positioning it relative to the given{' '}
          <code>referenceElement</code>.
        </p>

        <h3>
          Method: <code>togglePicker(referenceElement)</code>
        </h3>
        <p>
          Shows the picker (positioning it relative to{' '}
          <code>referenceElement</code>) if it is hidden, and hides it if it is
          visible.
        </p>

        <h3>
          Method: <code>setTheme(theme)</code>
        </h3>
        <p>
          Sets the theme of the picker. See{' '}
          <Link to="/docs/themes">Themes</Link> for more details.
        </p>

        <a name="categories" />
        <h2>Category IDs</h2>
        <p>The valid category IDs are as follows:</p>
        <ul>
          <li>
            <code>'smileys'</code>
          </li>
          <li>
            <code>'people'</code>
          </li>
          <li>
            <code>'animals'</code>
          </li>
          <li>
            <code>'food'</code>
          </li>
          <li>
            <code>'activities'</code>
          </li>
          <li>
            <code>'travel'</code>
          </li>
          <li>
            <code>'objects'</code>
          </li>
          <li>
            <code>'symbols'</code>
          </li>
          <li>
            <code>'flags'</code>
          </li>
        </ul>

        <a name="iconDefinitions" />
        <h2>Icon Definition Objects</h2>
        <p>
          An icon definition object must contain at least one of the following
          properties:
        </p>

        <ul>
          <li>
            <code>search</code>: The search icon, displayed when there is no
            search text entered.
          </li>
          <li>
            <code>clearSearch</code>: The button to clear the search, displayed
            when there is search text entered.
          </li>
          <li>
            <code>notFound</code>: The icon to display when a search yields no
            results.
          </li>
          <li>
            <code>categories</code>: A nested object containing one or more of
            the following:
            <ul>
              <li>
                <code>recents</code>: The Recent Emojis category.
              </li>
              <li>
                <code>smileys</code>: The Smileys &amp; Emotion category.
              </li>
              <li>
                <code>peopls</code>: The People &amp; Body category.
              </li>
              <li>
                <code>animals</code>: The Animals &amp; Nature category.
              </li>
              <li>
                <code>food</code>: The Food &amp; Drink category.
              </li>
              <li>
                <code>activities</code>: The Activities category.
              </li>
              <li>
                <code>travel</code>: The Travel &amp; Places category.
              </li>
              <li>
                <code>objects</code>: The Objects category.
              </li>
              <li>
                <code>symbols</code>: The Symbols category.
              </li>
              <li>
                <code>flags</code>: The Flags category.
              </li>
              <li>
                <code>custom</code>: The Custom category.
              </li>
            </ul>
          </li>
        </ul>

        <a name="i18n" />
        <h2>I18N Strings</h2>
        <p>
          The strings in the picker UI can be replaced with translated versions,
          if desired, by specifying the <code>i18n</code> option. The values and
          their defaults are as follows:
        </p>
        <pre>
          <code>{i18nStrings}</code>
        </pre>
      </div>
    </DocLayout>
  );
}
