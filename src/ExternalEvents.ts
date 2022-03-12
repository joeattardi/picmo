import { Events, EventKey } from './events';

export type ExternalEvent = 
  'emoji:select' |
  'picker:open' |
  'picker:close';

export type ExternalEventKey = EventKey<ExternalEvent>;

export class ExternalEvents extends Events<ExternalEvent> {}
