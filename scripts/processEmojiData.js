const { writeFileSync } = require('fs');

const rawData = require('emoji-datasource');

function getEmoji(unified) {
  const chars = unified.split('-');
  const codePoints = chars.map(char => parseInt(char, 16));
  return String.fromCodePoint(...codePoints);
}

const categories = [];

rawData.sort((e1, e2) => e1.sort_order - e2.sort_order);
const newEmojiData = rawData.map(emojiItem => {
  let categoryIndex = categories.indexOf(emojiItem.category);
  if (categoryIndex < 0) {
    categories.push(emojiItem.category);
    categoryIndex = categories.length - 1;
  }

  const newData = {
    n: emojiItem.short_names,
    e: getEmoji(emojiItem.unified),
    c: categoryIndex
  };

  if (emojiItem.skin_variations) {
    newData.variants = {};
    Object.keys(emojiItem.skin_variations).forEach(variation => {
      newData.variants[variation] = {
        n: emojiItem.short_names[0],
        e: getEmoji(emojiItem.skin_variations[variation].unified)
      };
    });
  }

  return newData;
});

writeFileSync('src/data/emoji.js', `export const categories = ${JSON.stringify(categories)}; export default ${JSON.stringify(newEmojiData)};`);