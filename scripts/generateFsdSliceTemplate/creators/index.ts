// 'fs.promises' === 'fs', но вместо колбэков используются промисы
import { mkdir } from 'fs/promises'; // работаем с файловой системой из 'Node.js'

import type { Layer } from '../types';

import { resolveRoot } from '../utils';

import { createModel } from './model';
// import createPublicApi from './createPublicApi.js';
// import createUi from './createUi';

export const createTemplate = async (layer: Layer, sliceName: string) => {
  try {
    // 'home/dmitry/WebstormProjects/ulbi_react/src/entities/test'
    await mkdir(resolveRoot(layer, sliceName)); // асинхронное создание папки для слайса
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Не удалось создать директорию '${sliceName}' для 'FSD'-слайса\n${e}`);
  }

  await createModel(layer, sliceName);
  // await createUi(layer, sliceName);
  // await createPublicApi(layer, sliceName);
};
