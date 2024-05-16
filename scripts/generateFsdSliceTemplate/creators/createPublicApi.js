const fs = require('fs/promises');

const firstCharUpperCase = require('../firstCharUpperCase.js');
const resolveRoot = require('../utils');

module.exports = async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName);

  const schemaName = `${sliceName}Schema`;

  try {
    // создаем файл c PUBLIC API
    await fs.writeFile(
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
