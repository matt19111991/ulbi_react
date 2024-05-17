// 'fs.promises' === 'fs', но вместо колбэков используются промисы
import {
  writeFile, // асинхронная запись данных в файл
} from 'fs/promises'; // работаем с файловой системой из 'Node.js'

import type { Layer } from '../types';

import { firstCharUpperCase, resolveRoot } from '../utils';

export const createPublicApi = async (layer: Layer, sliceName: string) => {
  const componentName = firstCharUpperCase(sliceName);

  const schemaName = `${sliceName}Schema`;

  try {
    const template = `export type { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';\n
export { ${componentName} } from './ui/${componentName}/${componentName}';\n`;

    // создаем файл c 'PUBLIC API'
    await writeFile(
      resolveRoot(layer, sliceName, 'index.ts'), // по этому пути
      template, // c этим шаблоном
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Не удалось создать 'PUBLIC API'\n${e}`);
  }
};
