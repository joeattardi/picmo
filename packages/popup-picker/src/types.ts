import { Placement } from '@floating-ui/dom';

export type FixedPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type RelativePosition = Placement | 'auto';
export type Position = FixedPosition | RelativePosition;
export type PositionLostStrategy = 
  | 'close'   // close the picker immediately
  | 'destroy' // destroy the picker permanently
  | 'hold'    // hold the previously calculated position
  | 'none';   // no action (the picker will jump to the top left corner of the screen if not closed manually)

export type PopupOptions = {
  hideOnClickOutside: boolean;
  hideOnEmojiSelect: boolean;
  hideOnEscape: boolean;
  position: Position;
  referenceElement?: HTMLElement;
  triggerElement?: HTMLElement;
  showCloseButton?: boolean;
  className?: string;
  onPositionLost?: PositionLostStrategy;
}
