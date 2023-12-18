const firstCharUpperCase = require('../firstCharUpperCase.js');

module.exports = (sliceName) => {
  const typeName = `${firstCharUpperCase(sliceName)}Schema`;
  // начало шаблона
  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ${typeName} } from '../types/${sliceName}Schema';

const initialState: ${typeName} = {
  
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
      .addCase(action.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(action.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(action.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
`; // конец шаблона
};
