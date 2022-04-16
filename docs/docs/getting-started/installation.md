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

<pre>
&lt;script src="<a href="https://unpkg.com/picmo@latest/umd/picmo.js">https://unpkg.com/picmo@latest/umd/picmo.js</a>"&gt;&lt;/script&gt;
</pre>


This will expose a `picmo` object in the global window scope with the following exports:

- `autoTheme`: CSS class for the `auto` theme
- `darkTheme`: CSS class for the `dark` theme
- `lightTheme`: CSS class for the `light` theme
- [`createDatabase`](../api/functions/create-database)
- [`createPicker`](../api/functions/create-picker)
- [`createPopup`](../api/functions/create-popup)
- [`deleteDatabase`](../api/functions/delete-database)
- [`deleteRecents`](../api/functions/delete-recents)
- [`NativeRenderer`](../api/classes/native-renderer)
- [`Renderer`](../api/classes/renderer)

### Twemoji renderer

If you want to use the Twemoji renderer, it is a separate UMD module:

<pre>
&lt;script src="<a href="https://unpkg.com/picmo@latest/umd/picmo.twemoji.js">https://unpkg.com/picmo@latest/umd/picmo.twemoji.js</a>"&gt;&lt;/script&gt;
</pre>

This will expose the [`TwemojiRenderer`](../api/classes/twemoji-renderer) class in the global window scope.

## Use ESM from CDN

TBD
