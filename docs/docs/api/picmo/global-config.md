---
title: Global Configuration
---

PicMo exports a `globalConfig` object that sets options that apply to all pickers.

```
import { globalConfig } from 'picmo';
```

## Supported properties

### `injectStyles`

- **Type**: `boolean`
- **Default**: `true`

Controls whether or not the CSS should automatically be injected into the document.

Sites with strict `Content-Security-Policy` settings may block PicMo from injecting the styles automatically, which will cause an error. In such cases, setting `injectStyles` to `false` will fix the issue by not attempting to inject them:

```
globalConfig.injectStyles = false;
```

If this is set to `false`, you will need to manually import the CSS stylesheet or add it to a `link` tag in the `head`.

This needs to be done _before_ creating any pickers.
