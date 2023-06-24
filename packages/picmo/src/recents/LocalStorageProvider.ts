import { isLocalStorageAvailable } from '../util';
import { createStorage } from '../webStorageShim';
import { WebStorageProvider } from './WebStorageProvider';

export class LocalStorageProvider extends WebStorageProvider {
  constructor() {
    super(isLocalStorageAvailable() ? localStorage : createStorage());
  }
}
