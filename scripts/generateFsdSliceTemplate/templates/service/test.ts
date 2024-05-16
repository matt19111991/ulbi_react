export const serviceTestTemplate = (sliceName: string) =>
  // начало шаблона
  `import type { StateSchema } from '@/app/providers/StoreProvider';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { ${sliceName}Service } from './${sliceName}Service';

const initialState: DeepPartial<StateSchema> = {};

describe('${sliceName}Service', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(${sliceName}Service, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ data: [] }));

    const result = await thunk.callThunk('123');

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(thunk.api.post).toHaveBeenCalledWith('${sliceName}Url', '123');

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual({});
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(${sliceName}Service, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('123');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toEqual('No ${sliceName} data');
  });
});
`; // конец шаблона
