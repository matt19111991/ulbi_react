import { firstCharUpperCase } from '../../utils';

export const reduxSliceTemplate = (sliceName: string) =>
  // начало шаблона
  `import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ErrorAction } from '@/shared/types/api';

import { service } from '../services/service/service';

import type { ${firstCharUpperCase(sliceName)}Schema } from '../schemaType/${sliceName}Schema';

const initialState: ${firstCharUpperCase(sliceName)}Schema = {
  
};

export const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(service.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(service.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(service.rejected, (state, action: ErrorAction) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
`; // конец шаблона
