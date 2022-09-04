import { createContext } from '@lit-labs/context';
import { PickerOptions } from '../types';

export const optionsContext = createContext<PickerOptions>('options');
