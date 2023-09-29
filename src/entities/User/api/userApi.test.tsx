import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { user as userMock } from '@/shared/lib/generators/user';

import { JsonSettings } from '../model/types/jsonSettings';

import { useGetUserDataByIdQuery, useSetJsonSettingsMutation } from './userApi';

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
        expect(result.current.currentData).toEqual(userMock);
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

        expect(response.data).toEqual(jsonSettingsArgs.jsonSettings);
      });
    });
  });
});
