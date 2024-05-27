// 'fs.promises' === 'fs', но вместо колбэков используются промисы
import {
  mkdir, // асинхронное создание папок
  writeFile, // асинхронная запись данных в файл
} from 'fs/promises'; // работаем с файловой системой из 'Node.js'

import { reduxSliceTemplate } from '../templates/reduxSlice';
import { reduxSliceTestTemplate } from '../templates/reduxSlice/test';

import { schemaTypeTemplate } from '../templates/schemaType';

import { selectorTemplate } from '../templates/selector';
import { selectorTestTemplate } from '../templates/selector/test';

import { serviceTemplate } from '../templates/service';
import { serviceTestTemplate } from '../templates/service/test';

import type { Layer } from '../types';

import { resolveRoot } from '../utils';

export const createModel = async (layer: Layer, sliceName: string) => {
  const resolveModelPath = (...segments: string[]) =>
    resolveRoot(layer, sliceName, 'model', ...segments);

  const createModelStructure = async () => {
    // асинхронно создаем необходимые папки
    try {
      await mkdir(resolveModelPath());
      await mkdir(resolveModelPath('selectors'));
      await mkdir(resolveModelPath('services'));
      await mkdir(resolveModelPath('slice'));
      await mkdir(resolveModelPath('types'));
    } catch (e) {
      console.log(`Не удалось создать необходимые папки для шаблона '${sliceName}'\n${e}`);
    }
  };

  const createReduxSlice = async () => {
    try {
      // создаем файл для слайса
      await writeFile(
        resolveModelPath('slice', `${sliceName}Slice.ts`), // по этому пути
        reduxSliceTemplate(sliceName), // c этим шаблоном
      );

      // создаем файл для тестов слайса
      await writeFile(
        resolveModelPath('slice', `${sliceName}Slice.test.ts`), // по этому пути
        reduxSliceTestTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      console.log(`Не удалось создать 'Redux'-слайс'\n${e}`);
    }
  };

  const createSchemaType = async () => {
    try {
      // создаем файл для типов
      await writeFile(
        resolveModelPath('types', `${sliceName}Schema.ts`), // по этому пути
        schemaTypeTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      console.log(`Не удалось создать тип схемы стейта\n${e}`);
    }
  };

  const createSelector = async () => {
    try {
      // создаем файл для селекторов
      await writeFile(
        resolveModelPath('selectors', `${sliceName}.ts`), // по этому пути
        selectorTemplate(sliceName), // c этим шаблоном
      );

      // создаем файл для тестов селекторов
      await writeFile(
        resolveModelPath('selectors', `${sliceName}.test.ts`), // по этому пути
        selectorTestTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      console.log(`Не удалось создать файлы для селекторов\n${e}`);
    }
  };

  const createService = async () => {
    try {
      // создаем файл для сервиса
      await writeFile(
        resolveModelPath('services', `${sliceName}.ts`), // по этому пути
        serviceTemplate(sliceName), // c этим шаблоном
      );

      // создаем файл для тестов сервиса
      await writeFile(
        resolveModelPath('services', `${sliceName}.test.ts`), // по этому пути
        serviceTestTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      console.log(`Не удалось создать файлы для сервисов\n${e}`);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
  await createSelector();
  await createService();
};
