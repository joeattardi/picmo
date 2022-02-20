import jss, { Styles } from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

// TODO redo animations
// TODO remove overlay for mobile

export function applyTheme(theme: Styles): string {
  const themeSheet = jss.createStyleSheet({}, { classNamePrefix: 'emoji-button-' });
  themeSheet.addRules(theme);
  themeSheet.attach();
  return (themeSheet.classes as { theme: string }).theme;
}
