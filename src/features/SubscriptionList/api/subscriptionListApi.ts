import type { Subscription } from '@/entities/Subscription';
import type { User } from '@/entities/User';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateSubscriptions } from '@/shared/lib/generators/subscriptions';

interface SubscriptionsResponse {
  data: Subscription[];
}

export interface UnsubscribeArgs {
  token: User['id'];
  userAgent: string;
}

interface UnsubscribeResponse {
  data: {
    message: string;
  };
}

const subscriptionsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /*
     'build.query'    - для 'GET' запросов
     'build.mutation' - для 'POST', 'PUT', 'DELETE', ... запросов

      название эндпоинта              'ReturnType'    'args'
              v                            v            v
    */
    getSubscriptionList: build.query<Subscription[], undefined>({
      queryFn: (_, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: generateSubscriptions(4) };
        }

        return baseQuery({
          url: 'subscriptions',
        }) as SubscriptionsResponse;
      },
    }),
    removeSubscription: build.mutation<UnsubscribeResponse['data'], UnsubscribeArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return {
            data: {
              message: 'Unsubscribed successfully',
            },
          };
        }

        return baseQuery({
          body: args,
          method: 'POST',
          url: 'unsubscribe',
        }) as UnsubscribeResponse;
      },
    }),
  }),
});

export const { useLazyGetSubscriptionListQuery, useRemoveSubscriptionMutation } = subscriptionsApi;
