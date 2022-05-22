---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

## From NPM

<Tabs>
  <TabItem value="npm" label="NPM" default>

```bash
npm install picmo
```

  </TabItem>

  <TabItem value="yarn" label="Yarn">

```bash
yarn add picmo
```

  </TabItem>
</Tabs>

## Use UMD build from CDN

PicMo is also available as a UMD module to use outside of a bundler. This distribution can be installed from a CDN with a `<script>` tag:

### Main picker code

```html
<script src="https://unpkg.com/picmo@5.1.0/dist/umd/picmo.js"></script>
```

This will expose a `picmo` object in the global window scope with the following exports:

- `autoTheme`: CSS class for the `auto` theme
- `darkTheme`: CSS class for the `dark` theme
- `lightTheme`: CSS class for the `light` theme
- [`createDatabase`](../api/picmo/functions/create-database)
- [`createPicker`](../api/picmo/functions/create-picker)
- [`deleteDatabase`](../api/picmo/functions/delete-database)
- [`deleteRecents`](../api/picmo/functions/delete-recents)
- [`NativeRenderer`](../api/picmo/classes/native-renderer)
- [`Renderer`](../api/picmo/classes/renderer)

### Popup picker

- [`createPopup`](../api/popup-picker/functions/create-popup)

If you want a popup picker, it is a separate UMD module:

```html
<script src="https://unpkg.com/@picmo/popup-picker@5.1.0/dist/umd/picmo-popup.js"></script>
```

### Twemoji renderer

If you want to use the Twemoji renderer, it is a separate UMD module:

```html
<script src="https://unpkg.com/@picmo/renderer-twemoji@5.1.0/dist/umd/picmo-twemoji.js"></script>
```

This will expose the [`TwemojiRenderer`](../api/renderer-twemoji/classes/twemoji-renderer) class in the global window scope.

## Use ESM from CDN

You can also import the ESM version of PicMo directly. You will first to create an ES module that imports PicMo:

```javascript title="index.js"
import { createPicker } from 'https://unpkg.com/picmo@5.1.0/dist/index.js';

createPicker(...);
```

Then you can import the local module from a `script` tag:

```html
<script type="module" src="index.js"></script>
```
