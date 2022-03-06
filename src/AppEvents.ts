import { Events, EventKey } from './events';

export type AppEvent =
  | 'emoji:select'
  | 'content:show'
  | 'preview:show'
  | 'preview:hide'
  | 'variantPopup:hide'
  | 'category:select'
  | 'recent:add';

export type AppEventKey = EventKey<AppEvent>;

export class AppEvents extends Events<AppEvent> {}
