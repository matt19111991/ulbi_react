export const serviceTemplate = (sliceName: string) =>
  // начало шаблона
  `import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { ResponseEntity } from '@/entities/${sliceName}';

import type { RequestArguments } from '../../types/${sliceName}Schema';

export const ${sliceName}Service = createAsyncThunk<ResponseEntity, RequestArguments, ThunkConfig<string>>(
  '${sliceName}/${sliceName}Service',
  async (args, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const response = await thunkApi.extra.api.post<ResponseEntity>('/${sliceName}Url', ['123']);

      if (!response.data) {
        return thunkApi.rejectWithValue('No ${sliceName} data');
      }

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
    }
  },
);
`; // конец шаблона
