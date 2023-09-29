import { rtkApi } from '@/shared/api/rtkApi';

import { Theme } from '@/shared/const/theme';

import { UserRole } from '../model/consts/userConsts';

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
  data: User;
}

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
    settingsPageHasBeenOpen: false,
    theme: Theme.DARK,
  },
  password: '12345',
  roles: [UserRole.ADMIN],
  username: 'Jack',
};

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDataById: build.query<User, string>({
      queryFn: (userId, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: mockUser };
        }

        return baseQuery({
          method: 'GET',
          url: `/users/${userId}`,
        }) as GetUserDataByIdResponse;
      },
    }),

    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      queryFn: ({ jsonSettings, userId }, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return {
            data: { ...mockUser, ...jsonSettings },
          };
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
