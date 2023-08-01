// eslint-disable-next-line import/extensions,import/no-unresolved
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => {
  const actionsNames = `${sliceName}Actions`;
  const reducerName = `${sliceName}Reducer`;
  const typeName = `${firstCharUpperCase(sliceName)}Schema`;

  return `import { ${typeName} } from '../types/${typeName}';

import { ${actionsNames}, ${reducerName} } from './${sliceName}Slice';

describe('${sliceName}', () => {
  test('test pending', () => {
    const state: DeepPartial<${typeName}> = {
      isLoading: false,
      error: 'Error',
    };

    expect(
      ${reducerName}(
        state as ${typeName},
        ${actionsNames}.action(),
      ),
    ).toEqual({ isLoading: true, error: undefined });
  });
});
`;
};
