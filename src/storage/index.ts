export * from './shim';

/**
 * Attempts to access a web storage object to determine if it's available.
 * Will detect whether (1) web storage is available and (2) if the browser is
 * allowing access.
 *
 * @param key the web storage to check (sessionStorage or localStorage)
 * @returns
 */
function isStorageAvailable(key: 'sessionStorage' | 'localStorage') {
  if (!(key in window)) {
    return false;
  }

  try {
    window[key].length;
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Determines if sessionStorage is available.
 */
export function isSessionStorageAvailable() {
  return isStorageAvailable('sessionStorage');
}

/**
 * Determines if localStorage is available.
 */
export function isLocalStorageAvailable() {
  return isStorageAvailable('localStorage');
}
