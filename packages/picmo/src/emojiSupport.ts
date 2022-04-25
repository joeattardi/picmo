import { EMOJI_VERSIONS } from 'emojibase';
import { Database } from './db';

const emojiVersions = EMOJI_VERSIONS.map(version => parseFloat(version));

/**
 * Determines the latest emoji version that is supported by the browser.
 * 
 * @param emojiData the emoji database
 * @returns the supported emoji version number
 */
export async function determineEmojiVersion(emojiData: Database) {
  for (let i = EMOJI_VERSIONS.length - 1; i >= 0; i--) {
    // Find the first emoji for this version.
    const { emoji } = await emojiData.getEmojiForVersion(emojiVersions[i]);

    // If it's supported, this is the version (since we start with the latest first)
    // Otherwise we'll check the next version
    if (supportsEmoji(emoji)) {
      return emojiVersions[i];
    }
  }
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
