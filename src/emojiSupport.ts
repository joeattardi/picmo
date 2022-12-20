// Representative emojis for each emoji version. If a given emoji is supported,
// we assume the system supports that emoji version.
const TEST_EMOJIS = [
  { version: 15, emoji: String.fromCodePoint(0x1fae8) },
  { version: 14, emoji: String.fromCodePoint(0x1f6dd) },
  { version: 13, emoji: String.fromCodePoint(0x1fac1) },
  { version: 12, emoji: String.fromCodePoint(0x1f9a9) },
  { version: 11, emoji: String.fromCodePoint(0x1f9b7) },
  { version: 5, emoji: String.fromCodePoint(0x1f92a) },
  { version: 4, emoji: String.fromCodePoint(0x2695) },
  { version: 3, emoji: String.fromCodePoint(0x1f922) },
  { version: 2, emoji: String.fromCodePoint(0x1f5e8) },
  { version: 1, emoji: String.fromCodePoint(0x1f600) }
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

  if (context) {
    context.textBaseline = 'top';
    context.font = '32px Arial';
    context.fillText(emoji, 0, 0);

    return context.getImageData(16, 16, 1, 1).data[0] !== 0;
  }
}
