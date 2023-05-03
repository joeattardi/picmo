import type EmojiPicker from '../elements/EmojiPicker';
import { computePosition, shift, arrow, offset } from '@floating-ui/dom';

export default function createPopup(picker: EmojiPicker, trigger: HTMLElement) {
  function show() {
    document.body.appendChild(picker);
    computePosition(trigger, picker).then(({ x, y }) => {
      Object.assign(picker.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  function hide() {
    document.body.removeChild(picker);
  }

  function toggle() {
    if (picker.isConnected) {
      hide();
    } else {
      show();
    }
  }

  return {
    show,
    hide,
    toggle
  };

  // console.log('popup');
}
