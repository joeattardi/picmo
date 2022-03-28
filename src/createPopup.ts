import { PickerOptions } from './types';
import { PopupPickerController } from './popupPicker';

export function createPopup(options: PickerOptions) {
  const popup = new PopupPickerController(options as Required<PickerOptions>);

  return popup;
}
