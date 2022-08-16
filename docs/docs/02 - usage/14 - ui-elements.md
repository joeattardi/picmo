# UI features

A PicMo picker contains several independent UI elements:

- *Search*. Used to search for emojis.
- *Category tabs*. Used to jump to a specific category.
- *Recents*. Remembers and shows recently used emoji in a separate category.
- *Emoji grid*. Used to browse and select emojis.
- *Preview*. Used to preview an emoji on focus or hover.
- *Variant popup*. Used to select a variant of an emoji.

By default, all of these elements are shown. The [`PickerOptions`](../api/picmo/types/picker-options) object supports several flags that can be used to disable search, category tabs, recents, preview, and variants:

- `showSearch`
- `showCategoryTabs`
- `showRecents`
- `showPreview`
- `showVariants`

:::tip
If you only enable a few categories for the picker, you may want to [adjust the number of rows and columns](size-layout) to make the overall picker smaller to prevent huge category buttons:

![few categories with wide picker](@site/static/img/usage/few-categories.png)
:::