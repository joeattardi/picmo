import type EmojiPicker from '../components/EmojiPicker.svelte';
import PopupPicker from './PopupPicker.svelte';
import { computePosition, shift, arrow, offset } from '@floating-ui/dom';
import type { PopupOptions } from './types';

type PartialWithRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;

export default function createPopup(options: PartialWithRequired<PopupOptions, 'triggerElement'>) {
  const popupContainer = document.createElement('div');
  document.body.appendChild(popupContainer);
  const component = new PopupPicker({
    target: popupContainer,
    props: {
      options: {
        position: 'bottom',
        ...options
      }
    }
  });

  return component;

  // function open() {

  //   component.open();
  //   // computePosition(options.triggerElement, popupContainer).then(({ x, y }) => {
  //   //   Object.assign(popupContainer.style, {
  //   //     left: `${x}px`,
  //   //     top: `${y}px`
  //   //   });

  //   //   // popupContainer.animate([
  //   //   //   { transform: 'scale(0.9)' },
  //   //   //   { transform: 'scale(1)' }
  //   //   // ], 1000);
  //   // });
  // }

  // function close() {
  //   document.body.removeChild(popupContainer);
  //   component.close();
  // }

  // function toggle() {
  //   if (popupContainer.isConnected) {
  //     close();
  //   } else {
  //     open();
  //   }
  // }

  // return {
  //   open,
  //   close,
  //   toggle
  // };

  // console.log('popup');
}
