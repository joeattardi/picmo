import { createContext } from '@lit-labs/context';

import { Bundle } from '../i18n/bundle';

export const i18nContext = createContext<Bundle>('i18n');
