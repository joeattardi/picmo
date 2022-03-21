import { Events, EventKey } from './events';

export type AppEvent =
  | 'data:ready'
  | 'emoji:select'
  | 'content:show'
  | 'preview:show'
  | 'preview:hide'
  | 'variantPopup:hide'
  | 'category:select'
  | 'category:next'
  | 'category:previous'
  | 'recent:add';

export type AppEventKey = EventKey<AppEvent>;

export class AppEvents extends Events<AppEvent> {}
