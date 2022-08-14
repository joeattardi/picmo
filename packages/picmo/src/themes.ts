import { getPrefixedClasses } from './util';

const {
  light: lightTheme,
  dark: darkTheme,
  auto: autoTheme
} = getPrefixedClasses('light', 'dark', 'auto');

export { lightTheme, darkTheme, autoTheme };
