import jss from 'jss';
import preset from 'jss-preset-default';

import { coreStyles, CoreKeys } from './core';
import { themes, ThemeKeys } from './theme';
import { categories, CategoryKeys } from './categories';
import { emoji, EmojiKeys } from './emoji';
import { preview, PreviewKeys } from './preview';
import { search, SearchKeys } from './search';
import { variants, VariantKeys } from './variants';

jss.setup(preset());

// TODO redo animations
// TODO remove overlay for mobile

const sheet = jss.createStyleSheet({}, { classNamePrefix: 'emoji-button-' });

sheet.addRules(themes);
sheet.addRules(coreStyles);
sheet.addRules(categories);
sheet.addRules(emoji);
sheet.addRules(preview);
sheet.addRules(search);
sheet.addRules(variants);
sheet.attach();

type ClassKeys = CoreKeys | ThemeKeys | CategoryKeys | EmojiKeys | PreviewKeys | SearchKeys | VariantKeys;
export default sheet.classes as { [key in ClassKeys]: string };
