import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { Reducer, ReducersMapObject, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

import { /* counterReducer, */ counterSlice } from '@/entities/Counter';
import { /* userReducer, */ userSlice } from '@/entities/User';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { /* pageScrollReducer, */ pageScrollSlice } from '@/widgets/Page';

// import { createReducerManager } from './reducerManager'; // RTK v.1 code splitting

import { combineSlicesAvoidErrorMessageMiddleware } from './combineSlicesMiddleware'; // RTK v.2 code splitting

import {
  // ReduxStoreWithManager, // RTK v.1 code splitting
  StateSchema,
  StateSchemaKey,
  ThunkExtraArg,
} from './StateSchema';

/**
 * Для возможности использования асинхронных редюсеров (RTK v.2 code splitting)
 */
export const rootReducer = combineSlices(
  counterSlice,
  pageScrollSlice,
  userSlice,

  rtkApi,
);

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  // при наличии внешних асинхронных редюсеров ('jest', 'storybook')
  if (asyncReducers) {
    Object.entries(asyncReducers).forEach(([name, reducer]) => {
      // асинхронно подгружаем редюсер
      rootReducer.inject({
        reducerPath: name,
        reducer: reducer as Reducer<NonNullable<StateSchema[StateSchemaKey]>>,
      });
    });
  }

  /*
    RTK v.1 code splitting

    const rootReducers: ReducersMapObject<StateSchema> = {
      counter: counterReducer,
      pageScroll: pageScrollReducer,
      user: userReducer,

      [rtkApi.reducerPath]: rtkApi.reducer,

      ...asyncReducers,
    };

    /**
     * Для возможности использования асинхронных редюсеров
    /**

    const reducerManager = createReducerManager(rootReducers);
*/

  const extraArgument: ThunkExtraArg = {
    api: $api, // добавляем в 'RTK' возможность использовать кастомный инстанс 'axios'
  };

  const store = configureStore({
    /**
     * Включаем инструменты разработчика только в режиме разработки
     */
    devTools: __IS_DEV__,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        /**
         * Иначе ошибки в тестах вида:
         *  'A non-serializable value was detected in the state, in the path:
         * `api.queries.getArticleRecommendationsList(4).data.0.user.avatar`.
         * Value: [Function: JestEmptyComponent]'
         */
        serializableCheck: false,

        /**
         * Дополнительные конфигурационные опции
         */
        thunk: {
          extraArgument,
        },
      }).concat(rtkApi.middleware, combineSlicesAvoidErrorMessageMiddleware),

    /**
     * Инициализация 'store' заранее подготовленными данными для тестов, storybook и т.д.
     */
    preloadedState: initialState,

    /**
     * Установка редюсеров по умолчанию, когда все редюсеры синхронные
     */
    reducer: rootReducer, // RTK v.2 code splitting
    // reducer: rootReducers, // RTK v.1 code splitting

    /**
     * Для работы с асинхронными редюсерами (RTK v.1 code splitting)
     *
     * 'reducerManager.reduce as Reducer<StateSchema>' в поле 'reducer' помогает избежать
     * ошибки типов в поле 'middleware', которая возникает из-за использования 'reducerManager'
     *
     */
    // reducer: reducerManager.reduce as Reducer<StateSchema>,
  });

  /*
    для возможности использования асинхронных редюсеров (RTK v.1 code splitting)
    store.reducerManager = reducerManager;
  */
  return store;
};

/**
 * Кастомная типизация 'dispatch', чтобы типы экшенов, схем, хранилища подхватывались TypeScript-ом
 */
export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>;
