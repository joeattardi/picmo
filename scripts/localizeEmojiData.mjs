import fs from 'fs/promises';

const cldrPath = 'vendor/cldr-json/cldr-json';
const annotationTypes = {
  'annotations': 'cldr-annotations-full/annotations',
  'annotationsDerived': 'cldr-annotations-derived-full/annotationsDerived'
};

const dataPath = 'src/data';

const avaliableLocales = await getLocaleList(cldrPath);

const emojiData = (await getJsonData(`${dataPath}/emoji.json`))?.emoji;
console.log(`Found ${emojiData?.length} emojis in file ${dataPath}/emoji.json`);

avaliableLocales.forEach(async locale => {

  console.log(`Asynchronous processing locale ${locale.toUpperCase()}`);
  const emojis = await Promise.all(emojiData.map(async emojiUnicodeData => {
    let annotations = (await getJsonData(`${cldrPath}/${annotationTypes.annotations}/${locale}/annotations.json`))?.annotations.annotations;
    if (!annotations[emojiUnicodeData.emoji]) {
      annotations = (await getJsonData(`${cldrPath}/${annotationTypes.annotationsDerived}/${locale}/annotations.json`))?.annotationsDerived.annotations;
    }

    if (!annotations[emojiUnicodeData.emoji]) {
      return emojiUnicodeData;
    }

    const emoji = annotations[emojiUnicodeData.emoji];
    return {
      ...emojiUnicodeData,
      name: emoji.tts[0],
      keywords: emoji.default.join(' | ')
    }

  }));
  console.log(`${locale.toUpperCase()}: Processed ${emojis.length} emoji annotations. Saving to JSON file...`);

  const filename = `${dataPath}/emoji_${locale}.json`;
  try {
    await fs.writeFile(filename, JSON.stringify(emojis, null, 4));
    console.log(`${locale.toUpperCase()}: File "${filename}" written succesfuly!`);
  } catch (err) {
    console.log(err);
  }

});

async function getLocaleList(cldrJsonPath) {
  let locales = null;
  try {
    locales = await fs.readdir(`${cldrJsonPath}/${annotationTypes.annotations}`);
  } catch (err) {
    console.error(err);
  }
  return locales;
}

async function getJsonData(filename) {
  let data = null;
  try {
    data = await fs.readFile(filename);
    data = JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
  return data;
}
