import { createContext } from '@lit-labs/context';

export interface PickerContextData {
  pickerId: string;
  emojiVersion: number;
}

export const emojiPickerContext = createContext<PickerContextData>('picker');
