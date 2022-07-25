import { autoUpdate ,computePosition, Placement, flip, offset } from '@floating-ui/dom';

import { Position, FixedPosition } from './types';

export type PositionCleanup = () => void;

export async function setPosition(picker: HTMLElement, referenceElement: HTMLElement | undefined, position: Position): Promise<PositionCleanup> {
  if (!position) {
    throw new Error('Must provide a positioning option');
  }

  return await (typeof position === 'string' ? 
    setRelativePosition(picker, referenceElement, position) : 
    setFixedPosition(picker, position));
}

async function setRelativePosition(picker: HTMLElement, referenceElement: HTMLElement | undefined, placement: Placement): Promise<PositionCleanup> {
  if (!referenceElement) {
    throw new Error('Reference element is required for relative positioning');
  }

  return autoUpdate(referenceElement, picker, async () => {
    const {x, y} = await computePosition(referenceElement, picker, {
      placement,
      middleware: [
        flip(),
        offset(5)
      ]
    });

    Object.assign(picker.style, {
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
