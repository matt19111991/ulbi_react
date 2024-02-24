import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { Theme } from '@/shared/const/theme';

import { UserRole } from '../model/consts/userConsts';

import { JsonSettings } from '../model/types/jsonSettings';

import { useGetUserDataByIdQuery, useSetJsonSettingsMutation } from './userApi';

const mockUser = {
  id: '1',
  avatar:
    'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  features: {
    isAppRedesigned: true,
    isArticleRatingEnabled: false,
    isCounterEnabled: true,
  },
  jsonSettings: {
    isArticlesPageHasBeenOpened: true,
    isFirstVisit: false,
    isSettingsPageHasBeenOpen: false,
    theme: Theme.DARK,
  },
  password: '12345',
  roles: [UserRole.ADMIN],
  username: 'Jack',
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

interface JsonSettingsArgs {
  jsonSettings: JsonSettings;
  userId: string;
}

describe('userApi', () => {
  describe('useGetUserDataByIdQuery', () => {
    test('returns user', async () => {
      const userId = '1';

      const { result } = renderHook(() => useGetUserDataByIdQuery(userId), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.currentData).toEqual(mockUser);
      });
    });
  });

  describe('useSetJsonSettingsMutation', () => {
    test('returns updated json settings', async () => {
      const jsonSettingsArgs: JsonSettingsArgs = {
        jsonSettings: {
          isArticlesPageHasBeenOpened: true,
        },
        userId: '1',
      };

      const { result } = renderHook(() => useSetJsonSettingsMutation(), {
        wrapper,
      });

      act(() => {
        const [mutation] = result.current;

        mutation(jsonSettingsArgs);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual({ ...mockUser, ...jsonSettingsArgs.jsonSettings });
      });
    });
  });
});
