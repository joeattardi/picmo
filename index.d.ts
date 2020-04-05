export as namespace EmojiButton;

export = EmojiButton;

declare class EmojiButton {
  constructor(options?: EmojiButton.Options);
  on(event: string, callback: (emoji: string) => void): void;
  off(event: string, callback: (emoji: string) => void): void;
  hidePicker(): void;
  showPicker(referenceEl: HTMLElement, options?: EmojiButton.Options): void;
  togglePicker(referenceEl: HTMLElement, options?: EmojiButton.Options): void;
  pickerVisible: boolean;
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
    showCategoryButtons?: boolean;
    recentsCount?: number;
    emojiVersion?: EmojiVersion;
    i18n?: I18NStrings;
    zIndex?: number;
    theme?: EmojiTheme;
    categories?: Category[];
    style?: EmojiStyle;
    emojisPerRow?: number;
    rows?: number;
    emojiSize?: string;
  }

  export type EmojiStyle = 'native' | 'twemoji';

  export type EmojiTheme = 'dark' | 'light' | 'auto';

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

  export type EmojiVersion =
  | '1.0'
  | '2.0'
  | '3.0'
  | '4.0'
  | '5.0'
  | '11.0'
  | '12.0'
  | '12.1';

  export type Category =
  | 'smileys'
  | 'people'
  | 'animals'
  | 'food'
  | 'activities'
  | 'travel'
  | 'objects'
  | 'symbols'
  | 'flags';

  export type I18NCategory =
  | 'recents'
  | 'smileys'
  | 'people'
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
