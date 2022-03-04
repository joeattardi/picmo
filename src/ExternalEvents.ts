import { Events, EventKey } from './events';

export type ExternalEvent = 
  'emoji:select' |
  'picker:hide';

export type ExternalEventKey = EventKey<ExternalEvent>;

export class ExternalEvents extends Events<ExternalEvent> {}
