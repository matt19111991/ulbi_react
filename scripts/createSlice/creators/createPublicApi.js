const fs = require('fs/promises');

// eslint-disable-next-line import/extensions,import/no-unresolved
const firstCharUpperCase = require('../firstCharUpperCase');
// eslint-disable-next-line import/extensions,import/no-unresolved
const resolveRoot = require('../resolveRoot');

module.exports = async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName);

  const schemaName = `${sliceName}Schema`;

  try {
    await fs.writeFile( // создаем файл c PUBLIC API
      resolveRoot('src', layer, sliceName, 'index.ts'), // по этому пути
      `export { ${componentName} } from './ui/${componentName}/${componentName}';

export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';
`,
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Не удалось создать PUBLIC API');
  }
};
