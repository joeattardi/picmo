const fs = require('fs/promises');
const path = require('path');

const copy = require('recursive-copy');

const {
  name,
  version,
  description,
  keywords,
  author,
  repository,
  homepage,
  bugs,
  license,
  dependencies
} = require('../package.json');

const newPkg = {
  name,
  version,
  description,
  keywords,
  author,
  repository,
  homepage,
  bugs,
  license,
  dependencies,
  main: 'index.js',
  files: [
    '*.js',
    'renderers',
    'i18n',
    'umd'
  ]
};

const rootPath = path.resolve(__dirname, '..');
const releasePath = path.resolve(__dirname, '..', 'release');
const distPath = path.resolve(__dirname, '..', 'dist');

async function start() {
  try {
    await fs.stat(releasePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Creating release path ${releasePath}`);
      await fs.mkdir(releasePath);
    }
  }

  console.log('Writing package.json');
  fs.writeFile(
    path.resolve(releasePath, 'package.json'),
    JSON.stringify(newPkg, null, 2)
  );

  console.log('Copying release files');
  await copy(rootPath, releasePath, {
    filter: [
      'README.md',
      'LICENSE'
    ]
  });

  console.log('Copying build output');
  await copy(distPath, releasePath, {
    filter: [
      '*.js',
      'i18n/*',
      'renderers/*',
      'umd/*',
    ]
  });
}

start();
