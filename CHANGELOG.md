# PicMo Changelog

For full details, see the documentation at [https://picmojs.com](https://picmojs.com).

## [5.1.0] - 2022-05-22

### Added

- Added a new in-memory emoji data store for scenarios where IndexedDB is not available ([#199](https://github.com/joeattardi/picmo/issues/199)). See [Emoji Data](https://picmojs.com/docs/usage/emoji-data) for more details.

#### Picker options

- New option: `dataStore` to specify a factory to create the desired data store type.

#### Popup options

- New option: `className` to apply additional CSS classes to the popup container (to override the theme or set a `z-index`). ([#198](https://github.com/joeattardi/picmo/issues/198)).

## [5.0.1] - 2022-05-18

### Changed

- Fixed exception being thrown when opening a popup picker with `showCloseButton: false` set.

## [5.0.0] - 2022-05-15

First PicMo release (previously Emoji Button).

- `@joeattardi/emoji-button` package split into three packages:
  - [`picmo`](./packages/picmo) - The main emoji picker package, can be used to create inline emoji pickers.
  - [`@picmo/popup-picker`](./packages/popup-picker) - The popup picker package, can be used to create popup emoji pickers. Requires `picmo` as a peer dependency.
  - [`@picmo/renderer-twemoji`](/.packages/renderer-twemoji) - The Twemoji renderer. Requires `picmo` as a peer dependency.
- All packages now include UMD builds.

### Added

- Emoji data is stored in an IndexedDB database locally.
- `data:ready` event signals when the database is initialized and ready to use.
- New rendering architecture adds support for implementing additional emoji renderers.
- Basic support for auto-detecting the available emoji version (the default behavior). A specific emoji version can still be passed in the picker options.
- Added data management functions:
  - `createDatabase`: Creates an emoji database ahead of time. This is not required as the picker will initialize the database if one doesn't exist.
  - `deleteDatabase`: Deletes an emoji database
  - `deleteRecents`: Deletes the recent emojis from local storage
  - Emojis can be searched via tags. An emoji's tags are also shown in the preview area.
- Popup pickers now have a close button as well.
- Events for when the picker is opened (`picker:open`) and closed (`picker:close`).

#### Picker options

- New option: `className` for applying custom theme styling.
- New option: `initialEmoji` for initial emoji selection.
- New option: `locale` for emoji data locale.
- New option: `messages` for emojibase-data message data.
- New option: `renderer` for specifying emoji renderer

#### Popup options

- New option: `hideOnClickOutside` to control whether or not the picker should close when clicking outside of it.
- New option: `hideOnEscape` to control whether or not the picker should close when pressing the escape key.
- New option: `showCloseButton` to control whether or not the close button should be shown.
- New option: `triggerElement` to denote the element that should trigger the popup.

### Changed

- The main `picmo` package only creates inline pickers. Popup pickers are created with `createPopup` from the `@picmo/popup-picker` package instead of `createPicker` from the main package. This function accepts the same options as the main package for the picker itself, and accepts an additional object with popup specific options.
- Emoji data is no longer bundled with the package. It can be supplied within the bundle
  from the `emoji-data` npm package or can be downloaded from a CDN at runtime.
- Popup code and Popper.js dependency separated into `@picmo/popup-picker` package.
- Twemoji code separated into `@picmo/twemoji` package.
- `emoji` event changed to `emoji:select`.
  - Emitted data has the properties `{ data, emoji, hexcode, url, label }`.
- `hidden` event changed to to `emoji:hide` in `@picmo/popup-picker`.
- Twemoji options changed to only specify the desired image type: `svg` (the default) or `png`.
- Event listeners are now added to pickers via `.addEventListener` instead of `.on`.

#### Picker options

- `showAnimation` changed to `animate`.
- `custom` format changed.
  - Previous: `{ name, emoji }`
  - New: `{ data, emoji, label, tags, url }`
- `emojiVersion` is now a number or the string `auth` for automatic detection.
- `recentsCount` changed to `maxRecents`.
- `showCategoryButtons` changed to `showCategoryTabs`.
- `rows` changed to `visibleRows`.

#### Popup options

- `autoHide` changed to `hideOnEmojiSelect`.

### Removed

- Plugins have temporarily been removed pending a larger redesign of the plugin system.

#### Picker options

- `icons` removed.
- `plugins` removed.
- `twemojiOptions` removed (now controlled by `@picmo/renderer-twemoji` package).
- `styleOptions` removed (now controlled by CSS variables in CSS class specified by the `className` option).
- Fuzzy search was removed.
