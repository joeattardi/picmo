# Themes

PicMo ships with three built-in themes:

- A light theme with a white background (`lightTheme`)
- A dark theme with a dark background (`darkTheme`)
- An automatic theme that will use the light or dark theme depending on the operating system's setting (if available). (`autoTheme`)

## Specifying a theme

The theme is specified with the `theme` option in the [`PickerOptions`](../api/picmo/types/picker-options#theme) object.

The theme names are exported directly from the `picmo` module:

```javascript
import { autoTheme, lightTheme, darkTheme } from 'picmo';
```
## Custom theming

TBD
