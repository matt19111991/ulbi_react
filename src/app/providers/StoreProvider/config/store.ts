import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { pageScrollReducer } from '@/widgets/Page';

import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    pageScroll: pageScrollReducer,
    user: userReducer,

    [rtkApi.reducerPath]: rtkApi.reducer,

    ...asyncReducers,
  };

  // для возможности использования асинхронных редюсеров
  const reducerManager = createReducerManager(rootReducers);

  const extraArgument: ThunkExtraArg = {
    api: $api, // добавляем в 'RTK' возможность использовать кастомный инстанс 'axios'
  };

  const store = configureStore({
    devTools: __IS_DEV__,

    /*
      'reducerManager.reduce as ReducersMapObject<StateSchema>' в поле 'reducer' помогает избежать
      ошибки типов в поле 'middleware', которая возникает из-за использования 'reducerManager'
    */
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }).concat(rtkApi.middleware),

    // инициализация 'store' заранее подготовленными данными для тестов, storybook и т.д.
    preloadedState: initialState,

    // reducer: rootReducers, // по умолчанию, когда все редюсеры синхронные

    // для работы с асинхронными редюсерами
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  });

  // для возможности использования асинхронных редюсеров
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

// кастомная типизация 'dispatch', чтобы типы экшенов, схем, хранилища подхватывались TypeScript-ом

//                        возвращаем  тип   хранилища (store), затем извлекаем метод 'dispatch' из типа
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']; // === typeof store.dispatch
