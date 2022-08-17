import { resolve, dirname } from 'path';
import { parse } from 'twemoji-parser';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import camelCase from 'camelcase';
import SVGSpriter from 'svg-sprite';
import emojiData from 'emojibase-data/en/compact.json' assert { type: 'json' };
import groupData from 'emojibase-data/en/messages.json' assert { type: 'json' };

const groups = groupData.groups.filter(group => group.key !== 'component');

const spritePath = resolve('src/sprites');

if (!existsSync(spritePath)) {
  mkdirSync(spritePath);
}

function add(emoji, spriter) {
  const filename = getFilename(emoji);
  const path = resolve(dirname('.'), 'twemoji', 'assets', 'svg', filename);
  if (existsSync(path)) {
    spriter.add(path, filename, readFileSync(path));
    return true;
  }

  return false;
}

function getFilename(emoji) {
  const [result] = parse(emoji.unicode);
  const [filename] = result.url.split('/').slice(-1);
  return filename;
}

let index = '';
groups.forEach(group => {
  const spriter = new SVGSpriter({
    mode: {
      inline: true,
      symbol: {
        sprite: `sprite-${group.key}.svg`
      }
    }
  });

  index += `export { default as ${camelCase(group.key)} } from './${group.key}.svg?raw';\n`;

  const categoryEmojis = emojiData.filter(emoji => emoji.group === group.order);
  categoryEmojis.forEach(emoji => {
    if (add(emoji, spriter) && emoji.skins) {
      emoji.skins.forEach(skin => {
        add(skin, spriter);
      });
    }
  });

  spriter.compile((error, result) => {
    writeFileSync(resolve(spritePath, `${group.key}.svg`), result.symbol.sprite.contents);
  });

});

writeFileSync(resolve(spritePath, 'index.ts'), index);
