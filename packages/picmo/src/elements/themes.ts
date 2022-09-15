import { css } from 'lit';

export const lightTheme = css`
  .lightTheme {
    --background-color: #f9fafb;
    --border-color: #cccccc;
    --category-name-background-color: #f9fafb;
    --category-name-text-color: hsl(214, 30%, 50%);
    --category-tab-color: #666;
    --category-tab-highlight-background-color: rgba(0, 0, 0, 0.15);
    --focus-indicator-background-color: hsl(198, 65%, 85%);
    --focus-indicator-color: #333333;
    --hover-background-color: #c7d2fe;
    --placeholder-background-color: #cccccc;
    --preview-background-color: var(--secondary-background-color);
    --scrollbar-background-color: var(--background-color);
    --scrollbar-color: #aaa;
    --search-background-color: #f9fafb;
    --search-focus-background-color: #ffffff;
    --search-icon-color: #999999;
    --search-placeholder-color: #71717a;
    --secondary-background-color: #e2e8f0;
    --tag-background-color: rgba(162, 190, 245, 0.3);
    --text-color: #000000;
  }
`;

export const darkTheme = css`

`;