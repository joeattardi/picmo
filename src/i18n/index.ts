export type Dictionary = {
  [key: string]: string;
};
export default class Bundle {
  #dictionary: Map<string, string>;

  constructor(dictionary: Dictionary = {}) {
    this.#dictionary = new Map(Object.entries(dictionary));
  }

  get(key: string): string {
    return this.#dictionary.get(key) || key;
  }
}
