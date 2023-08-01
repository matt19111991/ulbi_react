module.exports = (sliceName, selector) => {
  return `import { StateSchema } from 'app/providers/StoreProvider';

import { ${selector} } from './${sliceName}';

describe('${sliceName}', () => {
  describe('${sliceName} selector', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        ${sliceName}: {},
      };

      expect(${selector}(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(${selector}(state as StateSchema)).toBe('');
    });
  });
});
`;
};
