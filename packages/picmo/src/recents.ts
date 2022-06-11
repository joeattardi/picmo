import { RecentsProvider } from './recents/RecentsProvider';

// Deprecated legacy interface to clear recents for backwards compatibility.
// This should not be used by new code; instead, call clear() on the 
// RecentsProvider itself.

// It's a little odd and won't work well with a custom provider, but leaving it in
// so as not to create breaking changes.

// @deprecated Remove in 6.0.0.

let provider: RecentsProvider;

export function setProvider(_provider: RecentsProvider) {
  provider = _provider;
}

export function clear(): void {
  provider.clear();
}
