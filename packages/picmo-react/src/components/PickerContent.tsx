import { useContext } from 'react';

import classes from './EmojiPicker.module.css';

import Header from './Header';
import { PicMoContext } from './PicMoProvider';

export default function PickerContent() {
  const { options, dataState } = useContext(PicMoContext);

  const { theme } = options;

  return (
    <div className={theme}>
      <div className={classes.picker}>
        <Header />
      </div>
    </div>
  );
}
