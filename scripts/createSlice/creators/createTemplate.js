const fs = require('fs/promises'); // работаем с 'file system' из 'Node.js'

// eslint-disable-next-line import/extensions,import/no-unresolved
const resolveRoot = require('../resolveRoot');

// eslint-disable-next-line import/extensions,import/no-unresolved
const createModel = require('./createModel');
// eslint-disable-next-line import/extensions,import/no-unresolved
const createPublicApi = require('./createPublicApi');
// eslint-disable-next-line import/extensions,import/no-unresolved
const createUi = require('./createUi');

module.exports = async (layer, sliceName) => {
  try {
    // создаем папку для слоя и папку для слайса
    await fs.mkdir(resolveRoot('src', layer, sliceName));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Не удалось создать директорию для слайса ${sliceName}`);
  }

  await createModel(layer, sliceName);
  await createUi(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
