/**
 * Types definition file written by George Pickering <https://github.com/tedjenkins>, 2019
 */

// emoji.js
export declare function renderEmoji(emoji: object, ): HTMLElement;

// emojiContainer.js
export declare function renderEmojiContainer(emojis: object[], ): HTMLElement;

// events.js
export declare const EMOJI: string;
export declare const SHOW_TABS: string;
export declare const HIDE_TABS: string;
export declare const SHOW_SEARCH_RESULTS: string;
export declare const SHOW_PREVIEW: string;
export declare const HIDE_PREVIEW: string;
export declare const HIDE_VARIANT_POPUP: string;

// icons.js
export declare const building: string;
export declare const cat: string;
export declare const coffee: string;
export declare const flag: string;
export declare const futbol: string;
export declare const frown: string;
export declare const history: string;
export declare const lightbulb: string;
export declare const music: string;
export declare const search: string;
export declare const smile: string;
export declare const times: string;

// index.js
export declare function emojiButton(button: HTMLButtonElement, callback: (str: string) => void): void;

// preview.js
export declare function renderPreview(events: Event[]): HTMLElement;

// recent.js
export declare function load(): string[] | [];
export declare function save(emoji: object): void;

// search.js
export function renderSearch(events: Event[]): HTMLElement;

// tabs.js
export declare function renderTabs(events: Event[]): HTMLElement;

// util.js
export declare function createElement(tagName: string, className: string): HTMLElement;
export declare function empty(element: HTMLElement): void;

// variantPopup.js
export declare function renderVariantPopup(events: Event[], emoji: object): HTMLElement;
