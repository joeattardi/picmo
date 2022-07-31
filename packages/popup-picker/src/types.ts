import { Placement } from '@floating-ui/dom';

export type FixedPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type RelativePosition = Placement | 'auto';
export type Position = FixedPosition | RelativePosition;

export type PopupOptions = {
  hideOnClickOutside: boolean;
  hideOnEmojiSelect: boolean;
  hideOnEscape: boolean;
  position: Position;
  referenceElement?: HTMLElement;
  triggerElement?: HTMLElement;
  showCloseButton?: boolean;
  className?: string;
}
