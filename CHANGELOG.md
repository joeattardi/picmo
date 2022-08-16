# PicMo Changelog

For full details, see the documentation at [https://picmojs.com](https://picmojs.com).

## [5.5.0] - 2022-08-16
- Major CSS refactoring that will allow for easier style overrides when needed. Class names are no longer scoped with random prefixes for easier customization.
- [`picmo`] Added a new `auto` autofocus option that will choose a target based on available elements.
- [`picmo`] Added a global configuration store with an `injectStyles` option to control automatic CSS injection.
- [`picmo`] Fixed invalid scrollbar CSS properties.
- [`@picmo/popup-picker`] Added type="button" to the popup close button to prevent accidental form submission.
- [`@picmo/popup-picker`] Focus is returned to the trigger when closing only when pressing Escape or selecting an emoji

## [5.4.2] - 2022-08-06

- [`picmo`] Removed inline style from SVG icons that was causing Content-Security-Policy problems ([#224](https://github.com/joeattardi/picmo/issues/224))

## [5.4.1] - 2022-08-04

- [`picmo`] Fixed an issue where the initial category button would steal the focus on creation in an inline picker.
- [`picmo`] Fixed default options processing so that a `LocalStorageProvider` isn't instantiated immediately upon importing PicMo; this was causing errors in environments like Next.js where `localStorage` is not available. Now `localStorage` is only referenced when calling `createPicker`.

## [5.4.0] - 2022-07-30

- [`picmo`] Added new `autoFocus` option to better control autofocus behavior (or disable it entirely).
- [`picmo`] Deprecated the `autoFocusSearch` option in favor of `autoFocus`.
- [`@picmo/popup-picker`] Upgraded to use the floating-ui library (successor to Popper.js).
- [`@picmo/renderer-twemoji`] Made SVG container `display: none` to fix popup positioning issues.

## [5.3.0] - 2022-07-16

- [`picmo`] Fixed custom styling not being applied to the search results scrollbar ([#215](https://github.com/joeattardi/picmo/issues/215)).
- [`@picmo/renderer-twemoji`] New rendering design using SVG sprite sheets for improved performance ([#210](https://github.com/joeattardi/picmo/issues/210)).

## [5.2.0] - 2022-06-11

### Added

- [`picmo`] Added support for custom recent emoji data providers, added localStorage and sessionStorage providers built-in ([#202](https://github.com/joeattardi/picmo/issues/202)).

## [5.1.2] - 2022-06-03

### Fixed

- [`picmo`] Fixed buttons within the picker to have the attribute `type="button"` to prevent unintentional form submission when a picker appears inside of a form ([#209](https://github.com/joeattardi/picmo/issues/209)).

## [5.1.1] - 2022-05-30

### Fixed

- [`@picmo/popup-picker`] Fixed issue where the positionCleanup function was not defined when using fixed positioning, leading to a potential exception when closing a popup picker

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
