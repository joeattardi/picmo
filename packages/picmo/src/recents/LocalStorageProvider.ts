import { WebStorageProvider } from './WebStorageProvider';

export class LocalStorageProvider extends WebStorageProvider {
  constructor() {
    super(localStorage);
  }
}
