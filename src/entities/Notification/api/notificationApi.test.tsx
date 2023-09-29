import { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import { useGetNotificationsQuery } from './notificationApi';

const notificationsMock = generateNotifications(4);

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('notificationApi', () => {
  describe('useGetNotificationsQuery', () => {
    test('returns notifications', async () => {
      const { result } = renderHook(() => useGetNotificationsQuery(null), { wrapper });

      await waitFor(() => {
        expect(result.current.currentData).toEqual(notificationsMock);
      });
    });
  });
});
