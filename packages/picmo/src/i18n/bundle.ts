export type Dictionary = Record<string, string>;

export class Bundle {
  #dictionary: Map<string, string>;

  constructor(dictionary: Dictionary = {}) {
    this.#dictionary = new Map(Object.entries(dictionary));
  }

  get(key: string, fallback = key): string {
    return this.#dictionary.get(key) || fallback;
  }
}
