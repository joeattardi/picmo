/**
 * An extremely basic and naive WebStorage emulation. Intended as a fallback
 * to prevent exceptions.
 */
export function createStorage(): Storage {
  let data = {};

  return {
    getItem: key => data[key],
    setItem: (key, value) => (data[key] = value),
    length: Object.keys(data).length,
    clear: () => (data = {}),
    key: index => Object.keys(data)[index],
    removeItem: key => delete data[key]
  };
}
