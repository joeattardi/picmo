import { WebStorageProvider } from './WebStorageProvider';

export class SessionStorageProvider extends WebStorageProvider {
  constructor(maxRecents?: number) {
    super(sessionStorage, maxRecents);
  }
}
