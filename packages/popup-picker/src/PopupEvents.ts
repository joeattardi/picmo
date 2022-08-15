import { ExternalEvent } from 'picmo';

export type PopupEvent = 
  ExternalEvent |
  'picker:open' |
  'picker:close';
