import { Events, EventKey } from './events';

export type AppEvent = 
  'content:show' |
  'emoji:select' |
  'preview:show' |
  'preview:hide' |
  'variantPopup:hide' |
  'category:select' |
  'recent:add';

export type AppEventKey = EventKey<AppEvent>;

export class AppEvents extends Events<AppEvent> {}
