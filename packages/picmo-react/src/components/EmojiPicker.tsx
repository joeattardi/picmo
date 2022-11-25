import themes from '../themes.module.css';
import classes from './EmojiPicker.module.css';

import { PickerOptions, Theme } from './types';

export default function EmojiPicker({ 
  theme = themes.light as Theme
}: PickerOptions) {
  return (
    <div className={`${theme} ${classes.picker}`}>
      <h1>EmojiPicker</h1>
    </div>
  );
}

