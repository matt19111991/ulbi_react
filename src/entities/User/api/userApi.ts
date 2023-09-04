import { rtkApi } from '@/shared/api/rtkApi';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface SetJsonSettingsArg {
  jsonSettings: JsonSettings;
  userId: string;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        method: 'GET',
        url: `/users/${userId}`,
      }),
    }),

    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: ({ jsonSettings, userId }) => ({
        body: { jsonSettings },
        method: 'PATCH',
        url: `/users/${userId}`,
      }),
    }),
  }),
});

// для возможности вызова в 'async thunk' (аналогично хукам в компонентах)
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
