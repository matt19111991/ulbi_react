import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

import { Theme } from '@/shared/const/theme';

import { getJsonSettings, useJsonSettings } from './getUserJsonSettings';

describe('getUserJsonSettings', () => {
  describe('getJsonSettings', () => {
    test('should return settings', () => {
      const authData = {
        id: '1',
        jsonSettings: {
          theme: Theme.DARK,
        },
        username: 'Jack',
      };

      const state: DeepPartial<StateSchema> = {
        user: { authData },
      };

      expect(getJsonSettings(state as StateSchema)).toEqual(authData.jsonSettings);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = { user: {} };

      expect(getJsonSettings(state as StateSchema)).toEqual({});
    });
  });

  describe('useJsonSettings', () => {
    test('should return hook and correct selector value', () => {
      const authData = {
        id: '1',
        jsonSettings: {
          isFirstVisit: true,
          theme: Theme.DARK,
        },
        username: 'Jack',
      };

      const state: DeepPartial<StateSchema> = {
        user: { authData },
      };

      const wrapper = ({ children }: { children: ReactNode }) => (
        <StoreProvider initialState={state}>{children}</StoreProvider>
      );

      const { result } = renderHook(() => useJsonSettings(), { wrapper });
      // второй аргумент у 'renderHook()' - объект с опциями, в который под
      // ключом 'wrapper' можно прокинуть обертку для тестируемого компонента

      expect(result.current).toEqual({ isFirstVisit: true, theme: Theme.DARK });
    });
  });
});
