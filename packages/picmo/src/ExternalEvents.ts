import { Events, EventKey } from './events';

export type ExternalEvent = 
  'emoji:select' |
  'data:ready';

export type ExternalEventKey = EventKey<ExternalEvent>;

export class ExternalEvents extends Events<ExternalEvent> {}
