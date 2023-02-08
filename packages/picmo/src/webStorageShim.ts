// A super basic in-memory WebStorage emulation. This is required in
// some environments where localStorage/sessionStorage are not allowed.
export function createStorage(): Storage {
  let data = {};

  return {
    getItem: key => data[key],
    setItem: (key, value) => data[key] = value,
    length: Object.keys(data).length,
    clear: () => data = {},
    key: index => Object.keys(data)[index],
    removeItem: key => delete data[key]
  };
}