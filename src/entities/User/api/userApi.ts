import { rtkApi } from '@/shared/api/rtkApi';

import { user } from '@/shared/lib/generators/user';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface GetUserDataByIdResponse {
  data: User;
}

interface SetJsonSettingsArg {
  jsonSettings: JsonSettings;
  userId: string;
}

interface SetJsonSettingsResponse {
  data: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDataById: build.query<User, string>({
      queryFn: (userId, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: user };
        }

        return baseQuery({
          method: 'GET',
          url: `/users/${userId}`,
        }) as GetUserDataByIdResponse;
      },
    }),

    setJsonSettings: build.mutation<JsonSettings, SetJsonSettingsArg>({
      queryFn: ({ jsonSettings, userId }, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: jsonSettings };
        }

        return baseQuery({
          body: { jsonSettings },
          method: 'PATCH',
          url: `/users/${userId}`,
        }) as SetJsonSettingsResponse;
      },
    }),
  }),
});

// для возможности вызова в 'async thunk' (аналогично хукам в компонентах)
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;

// для unit тестов
export const { useGetUserDataByIdQuery, useSetJsonSettingsMutation } = userApi;
