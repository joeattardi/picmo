import { WebStorageProvider } from './WebStorageProvider';

export class LocalStorageProvider extends WebStorageProvider {
  constructor(maxRecents?: number) {
    super(localStorage, maxRecents);
  }
}
