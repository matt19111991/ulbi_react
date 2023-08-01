const fs = require('fs/promises');

// eslint-disable-next-line import/extensions,import/no-unresolved
const resolveRoot = require('../resolveRoot');

// eslint-disable-next-line import/extensions,import/no-unresolved
const reduxSliceTemplate = require('../templates/reduxSliceTemplate');
// eslint-disable-next-line import/extensions,import/no-unresolved
const reduxSliceTestTemplate = require('../templates/reduxSliceTestTemplate');

// eslint-disable-next-line import/extensions,import/no-unresolved
const schemaTypeTemplate = require('../templates/schemaTypeTemplate');

// eslint-disable-next-line import/extensions,import/no-unresolved
const selectorTemplate = require('../templates/selectorTemplate');
// eslint-disable-next-line import/extensions,import/no-unresolved
const selectorTestTemplate = require('../templates/selectorTestTemplate');

// eslint-disable-next-line import/extensions,import/no-unresolved
const serviceTemplate = require('../templates/serviceTemplate');
// eslint-disable-next-line import/extensions,import/no-unresolved
const serviceTestTemplate = require('../templates/serviceTestTemplate');

module.exports = async (layer, sliceName) => {
  const resolveModelPath = (
    ...segments
  ) => resolveRoot('src', layer, sliceName, 'model', ...segments);

  const createModelStructure = async () => {
    try { // создаем необходимые папки
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

  const createReduxSlice  = async () => {
    try {
      await fs.writeFile( // создаем файл для слайса
        resolveModelPath('slices', `${sliceName}Slice.ts`), // по этому пути
        reduxSliceTemplate(sliceName), // c этим шаблоном
      );

      await fs.writeFile( // создаем файл для тестов слайса
        resolveModelPath('slices', `${sliceName}Slice.test.ts`), // по этому пути
        reduxSliceTestTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать redux слайс', e);
    }
  };

  const createSchemaType  = async () => {
    try {
      await fs.writeFile( // создаем файл для типов
        resolveModelPath('types', `${sliceName}Schema.ts`), // по этому пути
        schemaTypeTemplate(sliceName), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать тип схемы стейта', e);
    }
  };

  const createSelector  = async () => {
    try {
      await fs.writeFile( // создаем файл для селекторов
        resolveModelPath('selectors', `${sliceName}.ts`), // по этому пути
        selectorTemplate(sliceName, `${sliceName}Selector`), // c этим шаблоном
      );

      await fs.writeFile( // создаем файл для тестов селекторов
        resolveModelPath('selectors', `${sliceName}.test.ts`), // по этому пути
        selectorTestTemplate(sliceName, `${sliceName}Selector`), // c этим шаблоном
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать файлы для селекторов', e);
    }
  };

  const createService  = async () => {
    try {
      await fs.writeFile( // создаем файл для сервиса
        resolveModelPath('services', `${sliceName}.ts`), // по этому пути
        serviceTemplate(sliceName, `${sliceName}Service`), // c этим шаблоном
      );

      await fs.writeFile( // создаем файл для тестов сервиса
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
