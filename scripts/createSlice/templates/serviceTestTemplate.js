module.exports = (sliceName, service) => {
  return `import { StateSchema } from 'app/providers/StoreProvider';

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { ${service} } from './${service}';

const initialState: DeepPartial<StateSchema> = {};

describe('${service}', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(${service}, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ data: [] }));

    const result = await thunk.callThunk('123');

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(comment);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(${service}, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('123');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
`;
};
