// 'fs.promises' === 'fs', но вместо колбэков используются промисы
import {
  mkdir, // асинхронное создание папок
  writeFile, // асинхронная запись данных в файл
} from 'fs/promises'; // работаем с файловой системой из 'Node.js'

import { componentTemplate } from '../templates/component';
import { storyTemplate } from '../templates/story';
import { styleTemplate } from '../templates/style';

import type { Layer } from '../types';

import { firstCharUpperCase, resolveRoot } from '../utils';

export const createUi = async (layer: Layer, sliceName: string) => {
  const resolveUiPath = (...segments: string[]) => resolveRoot(layer, sliceName, 'ui', ...segments);

  const createUiDir = async () => {
    try {
      await mkdir(resolveUiPath()); // асинхронно создаем папку 'ui'
    } catch (e) {
      console.log(`Не удалось создать директорию для 'UI'\n${e}`);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);

      await mkdir(resolveUiPath(componentName)); // асинхронно создаем папку '/ui/${componentName}'

      // создаем файл компонента '${componentName}.tsx'
      await writeFile(
        resolveUiPath(componentName, `${componentName}.tsx`), // по пути '/ui/${componentName}'
        componentTemplate(componentName), // c этим шаблоном
      );

      // создаем файл для 'storybook' '${componentName}.stories.tsx'
      await writeFile(
        resolveUiPath(componentName, `${componentName}.stories.tsx`), // по пути '/ui/${componentName}'
        storyTemplate(layer, componentName), // c этим шаблоном
      );

      // создаем файл стилей '${componentName}.module.scss'
      await writeFile(
        resolveUiPath(componentName, `${componentName}.module.scss`), // по пути '/ui/${componentName}'
        styleTemplate(componentName), // c этим шаблоном
      );
    } catch (e) {
      console.log(`Не удалось создать компонент\n${e}`);
    }
  };

  await createUiDir();
  await createComponent();
};
