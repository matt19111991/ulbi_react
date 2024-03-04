import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';

import { Theme } from '@/shared/const/theme';

import type { User } from '../../types/user';

import { getJsonSettings, useJsonSettings } from './getUserJsonSettings';

describe('getUserJsonSettings', () => {
  describe('getJsonSettings', () => {
    test('should return settings', () => {
      const authData: User = {
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
      const authData: User = {
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

      const ComponentWrapper = ({ children }: { children: ReactNode }) => (
        <StoreProvider initialState={state}>{children}</StoreProvider>
      );

      /*
        'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае 'JsonSettings'
      */
      const { result } = renderHook(() => useJsonSettings(), { wrapper: ComponentWrapper });

      expect(result.current).toEqual({ isFirstVisit: true, theme: Theme.DARK });
    });
  });
});
