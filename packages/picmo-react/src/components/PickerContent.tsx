import { useContext } from 'react';

import classes from './EmojiPicker.module.css';

import { PicMoContext } from './PicMoProvider';

export default function PickerContent() {
  const { options, data, dataState } = useContext(PicMoContext);

  const { theme } = options;

  return (
    <div className={`${theme} ${classes.picker}`}>
      <h1>EmojiPicker</h1>
      <h2>{dataState}</h2>
    </div>
  );
}