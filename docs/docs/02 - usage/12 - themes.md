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

PicMo's theme styling is set with CSS variables. This allows you to create a custom theme for your picker if desired.

To use a custom theme, define a CSS class that sets the desired variables to override. This class name is then passed as the [`className`](../api/picmo/types/picker-options#classname) option.

This theme class is meant to *extend* a built-in theme. You should select which PicMo theme to extend from, then add your custom overrides to the new class.

For example, to override the background color of the picker, you could define a CSS class like this:

```css
.my-picker {
  --background-color: red;
}
```

This class name is passed to the picker as the `className` option:

```javascript
createPicker({ className: 'my-picker' });
```

:::note

Your custom classes are applied to the main picker element. Keep CSS specificity rules in mind when applying the theme. In general, this can be done by either:

- Importing your CSS _after_ importing PicMo so that your theme options come second in the cascade.
- Making your CSS selector more specific than the built-in theme selector. For example, you can use `div.my-picker` instead of `.my-picker`.

If you don't do this, your theme overrides will not take effect.

:::

### Theme properties

These are the available CSS variables that can be overridden in your theme:

- `--accent-color`: Used for accented UI elements such as the highlight color of the current category.
- `--background-color`: The background of the main emoji grid area.
- `--border-color`: The color of the outer and inner borders within the picker.
- `--category-name-background-color`: The background of the category name header for each category in the emoji grid area.
- `--category-name-text-color`: The text color of the category name headers.
- `--error-color`: The color to use for errors.
- `--error-color-dark`: Darker error color.
- `--focus-indicator-color`: The outline color of a focused emoji.
- `--hover-background-color`: The background of an emoji shown when hovered over.
- `--placeholder-background-color`: The background color for loading placeholders.
- `--preview-background-color`: The background color of the preview area.
- `--scrollbar-background-color`: The background color of the scrollbar.
- `-scrollbar-color`: The color of the scrollbar.
- `--search-background-color`: The background color of the search input.
- `--search-focus-background-color`: The background color of the search input when it has focus.
- `--search-icon-color`: The color of the search and clear search icons in the search field.
- `--search-placeholder-color`: The color of the placeholder text in the search field.
- `--secondary-background-color`: The background of the other UI elements such as search, category tabs, and preview.
- `--secondary-text-color`: The color to use for secondary text; typically a muted color.
- `--tag-background-color`: The background color to use for tags in the preview area.
- `--text-color`: The primary text color for the picker.
- `--ui-font`: The font to use for UI elements.
- `--variant-popup-background-color`: The background color of the variant popup.
