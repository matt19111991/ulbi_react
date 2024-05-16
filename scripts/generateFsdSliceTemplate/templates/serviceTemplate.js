module.exports = (sliceName, service) => {
  return `import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const ${service} = createAsyncThunk<ResponseEntity, RequestArguments, ThunkConfig<string>>(
  '${sliceName}/${service}',
  async (args, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const response = await thunkApi.extra.api.post<ResponseEntity>('/${service}', ['123']);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('error');
    }
  },
);
`;
};
