import { Events, ExternalEvent } from 'picmo';

export type PopupEvent = 
  ExternalEvent |
  'picker:open' |
  'picker:close';

export class PopupEvents extends Events<PopupEvent> {}
