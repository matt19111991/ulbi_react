const fs = require('fs/promises'); // работаем с 'file system' из 'Node.js'

const resolveRoot = require('../resolveRoot.js');

const createModel = require('./createModel.js');
const createPublicApi = require('./createPublicApi.js');
const createUi = require('./createUi.js');

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
