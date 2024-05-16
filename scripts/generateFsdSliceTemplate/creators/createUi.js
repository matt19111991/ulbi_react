const fs = require('fs/promises');

const firstCharUpperCase = require('../firstCharUpperCase.js');
const resolveRoot = require('../utils');

const componentTemplate = require('../templates/componentTemplate.js');
const storyTemplate = require('../templates/storyTemplate.js');
const styleTemplate = require('../templates/styleTemplate.js');

module.exports = async (layer, sliceName) => {
  const resolveUiPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments);

  const createUiDir = async () => {
    try {
      await fs.mkdir(resolveUiPath());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать директорию для UI');
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);

      await fs.mkdir(resolveUiPath(componentName)); // создаем папку 'ui/${componentName}'

      // создаем файл '${componentName}.tsx' с указанным шаблоном
      await fs.writeFile(
        resolveUiPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );

      // создаем файл для 'storybook' '${componentName}.stories.tsx' с указанным шаблоном
      await fs.writeFile(
        resolveUiPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(layer, componentName),
      );

      // создаем файл стилей '${componentName}.module.scss' с указанным шаблоном
      await fs.writeFile(
        resolveUiPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Не удалось создать компонент');
    }
  };

  await createUiDir();
  await createComponent();
};
