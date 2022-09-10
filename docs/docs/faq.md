---
sidebar_label: FAQ
---

# Frequently asked questions

## How can I insert the selected emoji into my text field?

PicMo is a picker only; it does not perform any operations on text fields or other elements. When an emoji is selected in the picker, an [`emoji:select`](./api/picmo/types/external-event#emojiselect) event is fired containing [data about the selected emoji](./api/picmo/types/emoji-selection). From there, you are responsible for implementing whatever additional code is required to act on the selected emoji.

The "emoji button" component shown in the PicMo demos is a simple demonstration only, and is not actually included in the library for use.

## Why are some emojis not rendering correctly in the picker?

The appearance of emojis on a given computer is defined by its operating systems. Emoji is just a standard; each OS vendor is responsible for creating their own emoji glyphs. As such, the appearance of emojis on a given computer is not guaranteed to be the same as the appearance of emojis on another computer. 

Some emojis may not render correctly on a given computer or browser for various reasons.

An older operating system does not have the new emoji glyphs. In these cases, an emoji is often rendered as a square with a question mark in the middle. If this is an older OS that no longer receives updates, there really isn't any way around this problem. PicMo helps solve this problem by attempting to automatically determine the latest Emoji version that is supported by the current operating system. In theory, this means an older operating system will revert to an older version of the Emoji specification, so some emojis may be missing.

However, this is not foolproof. Even when an operating system supports a given emoji, there may be rendering errors. Some emojis are a single Unicode code point, but others are sequences of them combined together. For example, consider the [Woman Astronaut](https://emojipedia.org/woman-astronaut/) emoji. This emoji is actually two emojis - the [Woman](https://emojipedia.org/woman/) and the [Rocket](https://emojipedia.org/emoji/%F0%9F%9A%80/), joined by a Zero Width Joiner. The system may have glyphs defined for the Woman and Rocket emojis separately, but may not be aware of the Woman Astronaut combination. In cases like these, you will sometimes see an emoji be rendered as two emojis side by side.

Even with proper OS support, some browsers may have issues with rendering certain emojis. For example, at the time of writing (May 2022), Chrome does not correctly render the [Kiss: Woman, Man](https://emojipedia.org/kiss-woman-man/) emoji on macOS. 

## Why are some emojis not rendering correctly when I select them?

When you add PicMo to your application, you may notice some emojis do not appear correctly when they are selected and you append them into your document. Some emojis may appear as a black and white symbol instead of the colorful emoji image:

![unstyled emoji](@site/static/img/usage/emoji-bw.png)

Usually this is a font issue. Most fonts do not include all of the styled emoji symbols. You will need to use the system emoji font to display them correctly. The `font-family` used by PicMo seems to work well across platforms:

```css
font-family: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla',
    'Noto Color Emoji', 'EmojiOne Color', 'Android Emoji';
```

This will usually give you the emoji rendering you want:

![styled emoji](@site/static/img/usage/emoji-color.png)