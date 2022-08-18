---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

All PicMo packages are available on the NPM registry, and are also distributed as UMD modules which can be added to any site with a simple `<script>` tag. Resources can be served locally or loaded from a CDN.

## Using the UMD distributions

The UMD distributions for each module will expose a global object containing all of the same exports that are included in the NPM package.

The add-on packages include `picmo` as a _peer dependency_ - it is not bundled with them. In an npm project, you will need to install `picmo` along with any add-on packages. When using the UMD distributions, the main `picmo` module must be loaded first since the other modules reference it by its global name `picmo`.

## Using the ESM distributions from the browser

If your browser supports ES Modules, you can import PicMo or its add-ons with an import statement in a JavaScript file. This file must be added with a `script` tag with `type` set to `module`.

## `picmo`

### From NPM

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

### From a CDN (UMD)

The UMD for `picmo` exposes a global `picmo` object containing all exports.

<Tabs>
  <TabItem value="unpkg" label="unpkg">

```html
<script src="https://unpkg.com/picmo@latest/dist/umd/index.js"></script>
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```html
<script src="https://cdn.jsdelivr.net/npm/picmo@latest/dist/umd/index.js"></script>
```

  </TabItem>
</Tabs>

### From a CDN (ESM)

<Tabs>
  <TabItem value="unpkg" label="unpkg">

```javascript
import { createPicker } from 'https://unpkg.com/picmo@latest/dist/index.js';
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```javascript
import { createPicker } from 'https://cdn.jsdelivr.net/npm/picmo@latest/dist/index.js';
```

  </TabItem>
</Tabs>

## `@picmo/popup-picker`

### From NPM

<Tabs>
  <TabItem value="npm" label="NPM" default>

```bash
npm install @picmo/popup-picker
```

  </TabItem>

  <TabItem value="yarn" label="Yarn">

```bash
yarn add @picmo/popup-picker
```

  </TabItem>
</Tabs>

### From a CDN (UMD)

The UMD for `@picmo/popup-picker` exposes a global `picmoPopup` object containing all exports.

<Tabs>
  <TabItem value="unpkg" label="unpkg">

```html
<script src="https://unpkg.com/@picmo/popup-picker@latest/dist/umd/index.js"></script>
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```html
<script src="https://cdn.jsdelivr.net/npm/@picmo/popup-picker@latest/dist/umd/index.js"></script>
```

  </TabItem>
</Tabs>

### From a CDN (ESM)

<Tabs>
  <TabItem value="unpkg" label="unpkg">

```javascript
import { createPopup } from 'https://unpkg.com/@picmo/popup-picker@latest/dist/index.js?module';
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```javascript
import { createPopup } from 'https://cdn.jsdelivr.net/npm/@picmo/popup-picker@latest/dist/index.js';
```

  </TabItem>
</Tabs>

## `@picmo/renderer-twemoji`

### From NPM

<Tabs>
  <TabItem value="npm" label="NPM" default>

```bash
npm install @picmo/renderer-twemoji
```

  </TabItem>

  <TabItem value="yarn" label="Yarn">

```bash
yarn add @picmo/renderer-twemoji
```

  </TabItem>
</Tabs>

### From a CDN (UMD)

The UMD for `@picmo/renderer-twemoji` exposes a global `picmoTwemoji` object containing all exports.

<Tabs>
  <TabItem value="unpkg" label="unpkg">

```html
<script src="https://unpkg.com/@picmo/renderer-twemoji@latest/dist/umd/index.js"></script>
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```html
<script src="https://cdn.jsdelivr.net/npm/@picmo/renderer-twemoji@latest/dist/umd/index.js"></script>
```

  </TabItem>
</Tabs>

### From a CDN (ESM)

<Tabs>
  <TabItem value="unpkg" label="unpkg">

```javascript
import { TwemojiRenderer } from 'https://unpkg.com/@picmo/renderer-twemoji@latest/dist/index.js?module';
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```javascript
import { TwemojiRenderer } from 'https://cdn.jsdelivr.net/npm/@picmo/renderer-twemoji@latest/dist/index.js';
```

  </TabItem>
</Tabs>
