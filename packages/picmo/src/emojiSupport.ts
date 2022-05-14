// Representative emojis for each emoji version. If a given emoji is supported,
// we assume the system supports that emoji version.
const TEST_EMOJIS = [
  { version: 15, emoji: String.fromCodePoint(0x1FAE8) },
  { version: 14, emoji: String.fromCodePoint(0x1F6DD) },
  { version: 13.1, emoji: String.fromCodePoint(0x1F636, 0x200D, 0x1F32B, 0xFE0F) },
  { version: 13, emoji: String.fromCodePoint(0x1FAC1) },
  { version: 12.1, emoji: String.fromCodePoint(0x1F9D1, 0x200D, 0x1F9B0) },
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

  if (context) {
    context.textBaseline = 'top';
    context.font = '32px Arial';
    context.fillText(emoji, 0, 0);

    // Check 1: Does anything render? If the center point has no data, 
    // we can be pretty sure the emoji did not render.
    const supports = context.getImageData(16, 16, 1, 1).data[0] !== 0;
    
    // Check 2 (if supported): For an emoji sequence, does it overflow?
    // An unsupported emoji sequence may contain one or more individual emojis that are
    // supported. If this is the case, there will be multiple emoji glyphs rendered.
    // If this happens, the bounding box right will be past double the width, and
    // we'll assume this sequence is not supported.
    // If for some reason actualBoundingBoxRight is undefined, we'll assume the sequence is supported.
    const metrics = context.measureText(emoji);
    if (!metrics.actualBoundingBoxRight) {
      return supports;
    }

    const supportsSequence = metrics.actualBoundingBoxRight < (metrics.width * 2);
    return supports && supportsSequence;
  }
}
