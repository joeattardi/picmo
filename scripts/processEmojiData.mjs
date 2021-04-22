import fetchline from 'nodefetchline';
import fs from 'fs';

const URL = 'https://www.unicode.org/Public/emoji/13.1/emoji-test.txt';
const dataPath = 'src/data';

const DATA_LINE_REGEX = /((?:[0-9A-F]+ ?)+)\s+;(.+)\s+#.+E([0-9.]+) (.+)/;
const EMOJI_WITH_MODIFIER_REGEX = /([a-z]+): ([a-z -]+)/;
const EMOJI_WITH_SKIN_TONE_AND_MODIFIER_REGEX = /([a-z]+): ([a-z -]+), ([a-z ]+)/;

const categoryKeys = {
  'Smileys & Emotion': 'smileys',
  'People & Body': 'people',
  'Animals & Nature': 'animals',
  'Food & Drink': 'food',
  'Activities': 'activities',
  'Travel & Places': 'travel',
  'Objects': 'objects',
  'Symbols': 'symbols',
  'Flags': 'flags'
};

const EXCLUDE_LIST = [
  'light skin tone',
  'medium-light skin tone',
  'medium skin tone',
  'medium-dark skin tone',
  'dark skin tone',
  'red hair',
  'white hair',
  'curly hair',
  'bald'
];

const MODIFIER_SUBSTITUTIONS = {
  'bald': 'no hair'
};

let currentGroup;
let currentSubgroup;
let categoryIndex;

const data = {
  categories: [],
  emoji: []
};

const lineIterator = fetchline(URL);
console.log(`Processing file "${URL}"`);

for await (const line of lineIterator) {
  if (line.startsWith('# group:')) {
    currentGroup = line.slice('# group: '.length);
    if (currentGroup !== 'Component') {
      data.categories.push(categoryKeys[currentGroup]);
      categoryIndex = data.categories.length - 1;
      console.log(`   Found group ${currentGroup}. Saving as category ${categoryIndex}: ${categoryKeys[currentGroup]}`)
    }
  } else if (line.startsWith('# subgroup:')) {
    currentSubgroup = line.slice('# subgroup: '.length);
  } else if (!line.startsWith('#') && currentGroup !== 'Component') {
    const matcher = DATA_LINE_REGEX.exec(line);
    if (matcher) {
      const sequence = matcher[1].trim();
      const emoji = getEmoji(sequence);
      let name = matcher[4];

      let version = matcher[3];
      if (version === '0.6' || version === '0.7') {
        version = '1.0';
      }

      if (currentSubgroup === 'person') {
        const modifierMatcher = EMOJI_WITH_MODIFIER_REGEX.exec(name);
        const skinToneMatcher = EMOJI_WITH_SKIN_TONE_AND_MODIFIER_REGEX.exec(name);
        if (skinToneMatcher) {
          name = skinToneMatcher[1] + ' with ' + substituteModifier(skinToneMatcher[3]) + ': ' + skinToneMatcher[2];
        } else if (modifierMatcher) {
          if (!modifierMatcher[2].includes('skin tone')) {
            name = modifierMatcher[1] + ' with ' + substituteModifier(modifierMatcher[2]);
          }
        }
      }
      if (categoryIndex === 0) {
        console.log(`       emoji ${matcher[2].trim()}: ${emoji} - ${name}`);
      }
      if (matcher[2].trim() === 'fully-qualified') {
        data.emoji.push({ sequence, emoji, category: categoryIndex, name, variations: [], version });
      } else if (categoryIndex === 0) {
        console.log(`       Found 'unqualified' emoji: ${emoji} - ${name}`);
      }
    }
  }
}

let toDelete = [];

EXCLUDE_LIST.forEach(name => toDelete.push(data.emoji.find(e => e.name === name)));

const emojisWithVariations = data.emoji.filter(emoji => emoji.name.includes(':') && !emoji.name.startsWith('family'));
emojisWithVariations.forEach(emoji => {
  const baseName = emoji.name.split(':')[0];
  const baseEmoji = data.emoji.find(e => e.name === baseName);
  if (baseEmoji) {
    baseEmoji.variations.push(emoji.emoji);
    toDelete.push(emoji);
  }
});

// Cleanup
data.emoji = data.emoji.filter(e => !toDelete.includes(e));
data.emoji.forEach(emoji => {
  delete emoji.sequence;
  if (!emoji.variations.length) {
    delete emoji.variations;
  }
});

console.log(`Saving data to file "${dataPath}/emoji.js"`);
fs.writeFileSync(`${dataPath}/emoji.js`, `export default ${JSON.stringify(data)}`);
fs.writeFileSync(`${dataPath}/emoji.json`, JSON.stringify(data, null, 4));


function getEmoji(sequence) {
  const chars = sequence.split(' ');
  const codePoints = chars.map(char => parseInt(char, 16));
  return String.fromCodePoint(...codePoints);
}

function substituteModifier(name) {
  const substitutions = Object.keys(MODIFIER_SUBSTITUTIONS);
  for (let i = 0; i < substitutions.length; i++) {
    const substitution = substitutions[i];
    if (name.includes(substitution)) {
      return name.replace(substitution, MODIFIER_SUBSTITUTIONS[substitution]);
    }
  }

  return name;
}