import { WebStorageProvider } from './WebStorageProvider';

export class SessionStorageProvider extends WebStorageProvider {
  constructor() {
    super(sessionStorage);
  }
}
