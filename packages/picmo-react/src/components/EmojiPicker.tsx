import themes from '../themes.module.css';
import classes from './EmojiPicker.module.css';

export default function EmojiPicker() {
  return (
    <div className={`${themes.auto} ${classes.picker}`}>
      <h1>EmojiPicker</h1>
    </div>
  );
}
