# CSS Styling

## Controlling style injection

By default, PicMo will automatically inject the library's styles into the document. This is the simplest approach, but may cause problems on sites with strict `Content-Security-Policy` settings. In these cases, you can disable automatic style injection by setting the `injectStyles` property to `false` in the global configuration:

```javascript
import { globalConfig } from 'picmo';

globalConfig.injectStyles = false;
```

This property must be set _before_ creating any pickers or popup pickers. Each package (`picmo`, `@picmo/popup-picker`, `@picmo/renderer-twemoji`) includes an `index.css` file that can be added to your app with a `link` in the `head` section, or can be brought in any other way that your bundler uses to load styles.

## Style overrides

If the [theme customization](./themes) is not sufficient for your needs, individual CSS styles can be overridden with a custom stylesheet.

The recommended approach is to set a custom class on the picker via the picker or popup picker's `className` option. This will apply your class to the root element of the picker, which can then be used to select any of the various UI elements with class names applied.

For your custom styles to take effect, you should load your style sheet _after_ the PicMo styles, or make your CSS rules have higher specificity.
