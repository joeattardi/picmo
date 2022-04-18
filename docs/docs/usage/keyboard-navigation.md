# Keyboard interactions

A PicMo picker has full keyboard support.

## Searching

When searching, the search results can be closed by pressing the `Escape` key. This will return to the main emoji grid.

## Category selection

When a category tab is highlighted, the category can be changed by pressing the `Left Arrow` and `Right Arrow` keys.

## Navigating and selecting emojis

The emoji grid is focusable via the Tab key. When it receives focus, the current emoji will be highlighted. The emoji grid can be navigated with the arrow keys.

An emoji can be selected by pressing `Enter` or `Space`. This will cause the emoji to be emitted (or the [variant popup](./variants) to be shown).

When the variant popup is shown, the arrow keys are used to navigate the available variants.

## Selected category/focus behavior

- Only one emoji in the grid is ever focusable at a given time. Pressing the arrow keys changes which emoji is focusable and then focuses the new emoji.
- When a category tab is selected by clicking or using the arrow keys, that category will be the new active category and its first emoji becomes focused.
- When navigating the emoji grid with the arrow keys, crossing into a different category will make that category become the new active category.
- When a category is automatically highlighted while scrolling, this is a highlight only and does _not_ change the active category. The focused emoji in the actual active category remains focusable.

## Variant popup

The variant popup can be closed without selecting an emoji by pressing the `Escape` key.

## Popup picker

A popup picker can be closed by pressing the `Escape` key from the emoji grid. If search results are currently shown, it will clear the results but will not close the picker. Pressing `Escape` a second time will then close the picker.

## Summary

| Key         | UI element                  | Function
| ----------- | --------------------------- | ----- |
| `Escape`    | Anywhere (while searching)  | Close search results   |
| `Escape`  | Variant popup        | Close variant popup      |
| `Escape`  | Popup picker        | Close popup picker      |
| `Tab`     | Anywhere          | Cycle through UI elements        |
| `LeftArrow` | Category tabs | Navigate to previous category        |
| `LeftArrow` | Emoji grid, variant popup | Navigate to previous emoji        |
| `RightArrow` | Category tabs | Navigate to next category        |
| `RightArrow` | Emoji grid, variant popup | Navigate to next emoji |
| `UpArrow` | Emoji grid, variant popup | Navigate to previous row |
| `DownArrow` | Emoji grid, variant popup | Navigate to next row |
| `Enter` | Emoji grid, variant popup | Emit emoji |
| `Space` | Emoji grid, variant popup | Emit emoji |