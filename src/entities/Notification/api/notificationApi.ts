import { rtkApi } from '@/shared/api/rtkApi';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import { Notification } from '../model/types/notification';

interface NotificationsResponse {
  data: Notification[];
}

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: generateNotifications(4) };
        }

        return baseQuery({
          url: '/notifications',
        }) as NotificationsResponse;
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
