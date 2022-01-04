import light from './light';
import dark from './dark';

// TODO: How to export theme classes to outside so it can be specified?
// TODO: How to support custom themes?

export const themes = {
  themeLight: light,
  themeDark: dark,
  themeAuto: {
    '@media (prefers-color-scheme: light)': light,
    '@media (prefers-color-scheme: dark)': dark
  }
};

export type ThemeKeys = keyof typeof themes;
