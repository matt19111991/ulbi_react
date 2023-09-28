import { StateSchema } from '@/app/providers/StoreProvider';

import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { editArticle } from './editArticle';

const form: Article = {
  blocks: [
    {
      id: '1',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
      ],
      title: 'Заголовок этого блока',
      type: ArticleBlockType.TEXT,
    },
  ],
  createdAt: '26.02.2023',
  id: '1',
  img: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png',
  subtitle: 'Что нового в JS за 2023 год?',
  title: 'New article title',
  type: [ArticleType.IT],
  user: {
    id: '1',
    username: 'Jack',
  },
  views: 64,
};

const initialState: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
    },
  },
};

describe('editArticle', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(editArticle, initialState);

    thunk.api.put.mockReturnValue(Promise.resolve({ data: form }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(form);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(editArticle, initialState);

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });

  test('no data error', async () => {
    const thunk = new TestAsyncThunk(editArticle);

    const result = await thunk.callThunk(form);

    expect(thunk.api.put).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
