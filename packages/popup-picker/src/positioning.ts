import { autoUpdate, ComputePositionConfig, computePosition, Placement, flip, offset, autoPlacement, shift } from '@floating-ui/dom';
import { PopupPickerController } from './popupPicker';
import { Position, RelativePosition, FixedPosition, PositionLostStrategy } from './types';

export type PositionCleanup = () => void;

export async function setPosition(picker: PopupPickerController, pickerElement: HTMLElement, referenceElement: HTMLElement | undefined, position: Position): Promise<PositionCleanup> {
  if (!position) {
    throw new Error('Must provide a positioning option');
  }

  return await (typeof position === 'string' ? 
    setRelativePosition(picker, pickerElement, referenceElement, position) : 
    setFixedPosition(pickerElement, position));
}

async function setRelativePosition(picker: PopupPickerController, pickerElement: HTMLElement, referenceElement: HTMLElement | undefined, placement: RelativePosition): Promise<PositionCleanup> {
  if (!referenceElement) {
    throw new Error('Reference element is required for relative positioning');
  }

  let config: Partial<ComputePositionConfig>;

  if (placement === 'auto') {
    config = {
      middleware: [
        autoPlacement(),
        shift(),
        offset({ mainAxis: 5, crossAxis: 12 })
      ]
    };
  } else {
    config = {
      placement: placement as Placement,
      middleware: [
        flip(),
        shift(),
        offset(5)
      ]
    };
  }

  return autoUpdate(referenceElement, pickerElement, async () => {
    if (!referenceElement.isConnected || !referenceElement.offsetParent) {
      if (handlePositionLost(picker)) {
        return;
      }
    }

    const { x, y } = await computePosition(referenceElement, pickerElement, config);
    Object.assign(pickerElement.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`
    });
  });
}

function setFixedPosition(picker: HTMLElement, position: FixedPosition): PositionCleanup {
  picker.style.position = 'fixed';

  Object.entries(position).forEach(([key, value]) => {
    picker.style[key] = value;
  });

  /* eslint-disable @typescript-eslint/no-empty-function */
  return () => {};
}

function handlePositionLost(picker: PopupPickerController) {
  switch (picker.options.onPositionLost) {
    case 'close':
      picker.close();
      return true;
    case 'destroy':
      picker.destroy();
      return true;
    case 'hold':
      return true;
  }
}