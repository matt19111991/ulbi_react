export const selectorTestTemplate = (sliceName: string) =>
  // начало шаблона
  `import type { StateSchema } from '@/app/providers/StoreProvider';

import { ${sliceName}Selector } from './${sliceName}';

describe('${sliceName}', () => {
  describe('${sliceName} selector', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        ${sliceName}: {},
      };

      expect(${sliceName}Selector(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(${sliceName}Selector(state as StateSchema)).toBe('');
    });
  });
});
`; // конец шаблона
