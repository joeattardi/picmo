# Emoji variants

Many emojis support multiple variants. Typically this is different skin tones, but in some cases can be other variations (hair color, gender, etc.).

## Variant popup

If an emoji that has variants is selected in the picker, the available variants are displayed (along with the original emoji).

![Emoji variant popup](@site/static/img/usage/variants.png)

When a variant is selected, the popup will close and the selected variant will be emitted.

## Variant data

Some variants are associated with a particular Emoji version. For any such variants that are not supported by the current version of Emoji, the variant will not be shown.

## Disabling variants

If you do not want to show variants in the picker, specify the `showVariants: false` option.