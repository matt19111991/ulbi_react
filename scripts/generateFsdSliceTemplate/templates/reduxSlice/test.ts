import { firstCharUpperCase } from '../../utils';

export const reduxSliceTestTemplate = (sliceName: string) =>
  // начало шаблона
  `import type { Action } from '@reduxjs/toolkit';

import { service } from '../services/service/service';

import type { ${firstCharUpperCase(sliceName)}Schema } from '../types/${sliceName}Schema';

import { ${sliceName}Actions, ${sliceName}Reducer } from './${sliceName}Slice';

describe('${sliceName}Slice', () => {
  describe('sync actions', () => {
    test('test set setAction', () => {
      const state: DeepPartial<${firstCharUpperCase(sliceName)}Schema> = {};

      const reducer = ${sliceName}Reducer(
        state as ${firstCharUpperCase(sliceName)}Schema,
        ${sliceName}Actions.setAction()
      );

      expect(reducer).toEqual({});
    });
  });

  describe('async ${sliceName} action', () => {
    test('test set is loading', () => {
      const state: DeepPartial<${firstCharUpperCase(sliceName)}Schema> = {
        error: '${firstCharUpperCase(sliceName)} error',
        isLoading: false,
      };

      const reducer = ${sliceName}Reducer(
        state as ${firstCharUpperCase(sliceName)}Schema,
        service.pending as Action
      );

      expect(reducer).toEqual({});
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<${firstCharUpperCase(sliceName)}Schema> = {
        isLoading: true,
      };

      const reducer = ${sliceName}Reducer(
        state as ${firstCharUpperCase(sliceName)}Schema,
        service.fulfilled as Action
      );

      expect(reducer).toEqual({});
    });

    test('test set is rejected', () => {
      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<${firstCharUpperCase(sliceName)}Schema> = {
        error: undefined,
        isLoading: true,
      };

      const reducer = ${sliceName}Reducer(
        state as ${firstCharUpperCase(sliceName)}Schema,
        service.rejected(error, 'requestId') as Action,
      );

      expect(reducer).toEqual({});
    });
  });
});
`; // конец шаблона
