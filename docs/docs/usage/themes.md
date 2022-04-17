# Themes

PicMo ships with three built-in themes:

- A light theme with a white background (`lightTheme`)
- A dark theme with a dark background (`darkTheme`)
- An automatic theme that will use the light or dark theme depending on the operating system's setting (if available). (`autoTheme`)

## Specifying a theme

The theme is specified with the `theme` option in the [`PickerOptions`](../api/types/picker-options#theme-string) object.

The theme names are exported from the `picmo/themes` submodule:

```javascript
import { autoTheme, lightTheme, darkTheme } from 'picmo/themes';
```
## Custom theming

TBD
