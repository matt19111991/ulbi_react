import { StateSchema } from 'app/providers/StoreProvider';

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { initArticlesPage } from './initArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slice/articlesPageSlice');

describe('initArticlesPage', () => {
  test('success', async () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        inited: false,
      },
    };

    const thunk = new TestAsyncThunk(initArticlesPage, state);

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(articlesPageActions.initState).toHaveBeenCalled();
    expect(fetchArticlesList).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('not called', async () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        inited: true,
      },
    };

    const thunk = new TestAsyncThunk(initArticlesPage, state);

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(articlesPageActions.initState).not.toHaveBeenCalled();
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
