import { createContext } from '@lit-labs/context';

export interface PickerContextData {
  pickerId: string;
}

export const emojiPickerContext = createContext<PickerContextData>('picker');
