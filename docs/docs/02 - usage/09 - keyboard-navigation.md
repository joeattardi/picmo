# Keyboard interactions

A PicMo picker has full keyboard support.

## Searching

When searching, the search results can be closed by pressing the `Escape` key. This will return to the main emoji grid.

When there are search results, pressing the `Enter` or `Down Arrow` key will set focus to the emoji search results.

On the top row of search results, pressing the `Up Arrow` key will set focus back to the search field.

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

### Anywhere within the picker

- `Command+S`, `Control+S`: Jump to the search field

### Anywhere while search results are shown

- `Escape`: Close search results

### Variant popup

- `Escape`: Close variant popup
- ⬆️, ⬇️, ⬅️, ➡️: Navigate variant grid
- `Enter`, `Space`: Select variant

### Popup picker
- `Escape`: Close popup picker

### Category tabs

- ⬅️, ➡️: Navigate category tabs

### Search field

- `Enter`, ⬇️: Focus search results
- `Escape`: Clear search field and return to emoji grid

### Search results

- ⬆️: Focus search field

### Emoji grid

- ⬆️, ⬇️, ⬅️, ➡️: Navigate emoji grid
- `Enter`, `Space`: Select emoji
