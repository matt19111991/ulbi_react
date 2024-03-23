import { rtkApi } from '@/shared/api/rtkApi';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import type { Notification } from '../model/types/notification';

interface NotificationsResponse {
  data: Notification[];
}

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /*
      нужно передать 'undefined' в аргументы, чтобы при использовании хука в компонентах
      можно было прокинуть в хук аргумент с опциями
    */
    getNotifications: build.query<Notification[], undefined>({
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
