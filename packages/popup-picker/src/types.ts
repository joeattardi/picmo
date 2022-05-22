import { Placement } from '@popperjs/core';

export type FixedPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type Position = FixedPosition | Placement;

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
