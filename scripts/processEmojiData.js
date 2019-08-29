const { writeFileSync } = require('fs');

const rawData = require('emoji-datasource');

function getEmoji(unified) {
  const chars = unified.split('-');
  const codePoints = chars.map(char => parseInt(char, 16));
  return String.fromCodePoint(...codePoints);
}

rawData.sort((e1, e2) => e1.sort_order - e2.sort_order);
const newEmojiData = rawData.map(emojiItem => {
  const newData = {
    name: emojiItem.short_name,
    key: emojiItem.short_name,
    names: emojiItem.short_names,
    emoji: getEmoji(emojiItem.unified),
    category: emojiItem.category
  };

  if (emojiItem.skin_variations) {
    newData.variants = {};
    Object.keys(emojiItem.skin_variations).forEach(variation => {
      newData.variants[variation] = {
        name: emojiItem.short_name,
        key: `${emojiItem.short_name}-${variation}`,
        emoji: getEmoji(emojiItem.skin_variations[variation].unified)
      };
    });
  }

  return newData;
});

writeFileSync('src/data/emoji.js', `export default ${JSON.stringify(newEmojiData)};`);