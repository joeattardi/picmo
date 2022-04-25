import { Events, EventKey } from './events';

export type AppEvent =
  | 'data:ready'
  | 'error'
  | 'reinitialize'
  | 'emoji:select'
  | 'content:show'
  | 'preview:show'
  | 'preview:hide'
  | 'variantPopup:hide'
  | 'category:select'
  | 'category:next'
  | 'category:previous'
  | 'recent:add'
  | 'focus:change';

export type AppEventKey = EventKey<AppEvent>;

export class AppEvents extends Events<AppEvent> {}
