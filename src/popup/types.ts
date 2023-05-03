import type { Placement } from '@floating-ui/dom';

export type FixedPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type Position = FixedPosition | Placement;

export type PopupOptions = {
  position: Position;
  triggerElement: HTMLElement;
};
