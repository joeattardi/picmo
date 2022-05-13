// TODO: Can we find a way to test versions that only consist of combinations of emojis?
// These could give a false positive if one of the emojis in the sequence is an older supported emoji,
// we might think that version is supported.
// Can we somehow check if only one "character" is rendered?

// Representative emojis for each emoji version. If a given emoji is supported,
// we assume the system supports that emoji version.
const TEST_EMOJIS = [
  { version: 15, emoji: String.fromCodePoint(0x1FAE8) },
  { version: 14, emoji: String.fromCodePoint(0x1F6DD) },
  { version: 13, emoji: String.fromCodePoint(0x1FAC1) },
  { version: 12, emoji: String.fromCodePoint(0x1F971) },
  { version: 11, emoji: String.fromCodePoint(0x1F9B7) },
  { version: 5, emoji: String.fromCodePoint(0x1F92A) }, 
  { version: 4, emoji: String.fromCodePoint(0x2695) },
  { version: 3, emoji: String.fromCodePoint(0x1F922) },
  { version: 2, emoji: String.fromCodePoint(0x1F5E8) },
  { version: 1, emoji: String.fromCodePoint(0x1F600) }
];

/**
 * Determines the latest emoji version that is supported by the browser.
 * @returns the supported emoji version number
 */
export function determineEmojiVersion() {
  const supportedEmoji = TEST_EMOJIS.find(emoji => supportsEmoji(emoji.emoji));
  return supportedEmoji?.version ?? 1;
}

/**
 * Checks if the given emoji is rendered correctly by the browser.
 * 
 * @param emoji the emoji to attempt to render
 * @returns true if the emoji renders correctly, false otherwise
 */
function supportsEmoji(emoji: string) {
  const context = document.createElement('canvas').getContext('2d');

  // Draw the emoji on the canvas. We make a rudimentary check: if the center of the emoji
  // has no color, then we can assume the browser rendered a box for an unsupported emoji.
  // This is the typical way this is done, including on GitHub.
  if (context) {
    context.textBaseline = 'top';
    context.font = '32px Arial';
    context.fillText(emoji, 0, 0);
    return context.getImageData(16, 16, 1, 1).data[0] !== 0;
  }
}
