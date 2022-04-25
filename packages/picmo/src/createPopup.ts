import { PickerOptions } from './types';
import { PopupPickerController } from './popupPicker';

export function createPopup(options: Partial<PickerOptions>) {
  const popup = new PopupPickerController(options);

  return popup;
}
