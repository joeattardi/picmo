export type Dictionary = {
  [key: string]: string;
};

export default class Bundle {
  #dictionary: Dictionary;

  constructor(dictionary: Dictionary) {
    this.#dictionary = dictionary;
  }

  get(key: string): string {
    return this.#dictionary[key] || key;
  }
}
