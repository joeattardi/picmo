import { autoUpdate, ComputePositionConfig, computePosition, Placement, flip, offset, autoPlacement, shift } from '@floating-ui/dom';

import { Position, RelativePosition, FixedPosition } from './types';

export type PositionCleanup = () => void;

export async function setPosition(picker: HTMLElement, referenceElement: HTMLElement | undefined, position: Position): Promise<PositionCleanup> {
  if (!position) {
    throw new Error('Must provide a positioning option');
  }

  return await (typeof position === 'string' ? 
    setRelativePosition(picker, referenceElement, position) : 
    setFixedPosition(picker, position));
}

async function setRelativePosition(picker: HTMLElement, referenceElement: HTMLElement | undefined, placement: RelativePosition): Promise<PositionCleanup> {
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

  return autoUpdate(referenceElement, picker, async () => { 
    const {x, y} = await computePosition(referenceElement, picker, config);
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
