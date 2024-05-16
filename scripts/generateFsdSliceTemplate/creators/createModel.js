const fs = require('fs/promises');

const resolveRoot = require('../resolveRoot.js');

const reduxSliceTemplate = require('../templates/reduxSliceTemplate.js');
const reduxSliceTestTemplate = require('../templates/reduxSliceTestTemplate.js');

const schemaTypeTemplate = require('../templates/schemaTypeTemplate.js');

const selectorTemplate = require('../templates/selectorTemplate.js');
const selectorTestTemplate = require('../templates/selectorTestTemplate.js');

const serviceTemplate = require('../templates/serviceTemplate.js');
const serviceTestTemplate = require('../templates/serviceTestTemplate.js');

module.exports = async (layer, sliceName) => {
  const resolveModelPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'model', ...segments);

  const createModelStructure = async () => {
    // создаем необходимые папки
    try {
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('types'));
      await fs.mkdir(resolveModelPath('slices'));
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Не удалось создать необходимые папки для шаблона ${sliceName}`, e);
    }
  };

  const createReduxSlice = async () => {
    try {
      // создаем файл для слайса
      await fs.writeFile(
        resolveModelPath('slices', `${sliceName}Slice.ts`), // по этому пути
        reduxSliceTemplate(sliceName), // c этим шаблоном
      );

      // создаем файл для тестов слайса
      await fs.writeFile(
        resolveModelPath('slices', `${sliceName}Slice.test.ts`), // по этому пути
        reduxSliceTestTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать redux слайс', e);
    }
  };

  const createSchemaType = async () => {
    try {
      // создаем файл для типов
      await fs.writeFile(
        resolveModelPath('types', `${sliceName}Schema.ts`), // по этому пути
        schemaTypeTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать тип схемы стейта', e);
    }
  };

  const createSelector = async () => {
    try {
      // создаем файл для селекторов
      await fs.writeFile(
        resolveModelPath('selectors', `${sliceName}.ts`), // по этому пути
        selectorTemplate(sliceName, `${sliceName}Selector`), // c этим шаблоном
      );

      // создаем файл для тестов селекторов
      await fs.writeFile(
        resolveModelPath('selectors', `${sliceName}.test.ts`), // по этому пути
        selectorTestTemplate(sliceName, `${sliceName}Selector`), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать файлы для селекторов', e);
    }
  };

  const createService = async () => {
    try {
      // создаем файл для сервиса
      await fs.writeFile(
        resolveModelPath('services', `${sliceName}.ts`), // по этому пути
        serviceTemplate(sliceName, `${sliceName}Service`), // c этим шаблоном
      );

      // создаем файл для тестов сервиса
      await fs.writeFile(
        resolveModelPath('services', `${sliceName}.test.ts`), // по этому пути
        serviceTestTemplate(sliceName, `${sliceName}Service`), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать файлы для сервисов', e);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
  await createSelector();
  await createService();
};
