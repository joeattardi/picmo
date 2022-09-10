import { createContext } from '@lit-labs/context';
import { EventBus } from '../EventBus';

export interface PickerContextData {
  pickerId: string;
  emojiVersion: number;
  events: EventBus;
}

export const emojiPickerContext = createContext<PickerContextData>('picker');
