export as namespace EmojiButton;

export = EmojiButton;

declare class EmojiButton {
  constructor(options?: EmojiButton.Options);
  on(event: string, callback: () => void): void;
  off(event: string, callback: () => void): void;
  hidePicker(): void;
  showPicker(referenceEl: HTMLElement, options: EmojiButton.Options)
}

declare namespace EmojiButton {
  export interface Options {
    position?: Placement;
    autoHide?: boolean;
    autoFocusSearch?: boolean;
    showPreview?: boolean;
    showSearch?: boolean;
    showRecents?: boolean;
    showVariants?: boolean;
    recentsCount: number;
    emojiVersion?: EmojiVersion;
    i18n?: I18NStrings;
    zIndex?: number;
  }

  export type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

  export type EmojiVersion = '0.0' | '2.0' | '4.0' | '5.0' | '11.0' | '12.1';

  export type I18NCategory =
  | 'recents'
  | 'smileys'
  | 'animals'
  | 'food'
  | 'activities'
  | 'travel'
  | 'objects'
  | 'symbols'
  | 'flags';

  export interface I18NStrings {
    search: string;
    categories: {
      [key in I18NCategory]: string;
    };
    notFound: string;
  }
}
