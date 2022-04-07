import { Placement } from '@popperjs/core';
import { createPopper } from '@popperjs/core';

import { Position, FixedPosition } from './types';

export type PositionCleanup = () => void;

export function setPosition(picker: HTMLElement, referenceElement: HTMLElement, position: Position): PositionCleanup {
  if (!position) {
    throw new Error('Must provide a positioning option');
  }

  return typeof position === 'string' ? 
    setRelativePosition(picker, referenceElement, position) : 
    setFixedPosition(picker, position);
}

function setRelativePosition(picker: HTMLElement, referenceElement: HTMLElement, placement: Placement): PositionCleanup {
  if (!referenceElement) {
    throw new Error('Reference element is required for relative positioning');
  }

  const popper = createPopper(referenceElement, picker, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  });

  return () => popper.destroy();
}

function setFixedPosition(picker: HTMLElement, position: FixedPosition): PositionCleanup {
  picker.style.position = 'fixed';

  Object.entries(position).forEach(([key, value]) => {
    picker.style[key] = value;
  });

  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  return () => {};
}
