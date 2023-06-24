import { isSessionStorageAvailable } from '../util';
import { createStorage } from '../webStorageShim';
import { WebStorageProvider } from './WebStorageProvider';

export class SessionStorageProvider extends WebStorageProvider {
  constructor() {
    super(isSessionStorageAvailable() ? sessionStorage : createStorage());
  }
}
