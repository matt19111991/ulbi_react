import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { /* counterReducer, */ counterSlice } from '@/entities/Counter';
import { /* userReducer, */ userSlice } from '@/entities/User';

import { /* pageScrollReducer, */ pageScrollSlice } from '@/widgets/Page';

// import { createReducerManager } from './reducerManager'; // RTK v.1 code splitting

import { combineSlicesAvoidErrorMessageMiddleware } from './combineSlicesMiddleware'; // RTK v.2 code splitting
import { errorHandlerMiddleware } from './errorHandlerMiddleware';

import type { StateSchema, StateSchemaKey, ThunkExtraArg } from './StateSchema';

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
  // при наличии внешних асинхронных редюсеров ('jest', 'storybook') (RTK v.2 code splitting)
  if (asyncReducers) {
    Object.entries(asyncReducers).forEach(([name, reducer]) => {
      // асинхронно подгружаем редюсер
      rootReducer.inject({
        reducerPath: name,
        reducer: reducer as Reducer<StateSchema[StateSchemaKey]>,
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
         *  `api.queries.getArticleRecommendationsList(4).data.0.user.avatar`.
         *  Value: [Function: JestEmptyComponent]'
         */
        serializableCheck: false,

        /**
         * Дополнительные конфигурационные опции
         */
        thunk: {
          extraArgument,
        },
      }).concat(
        rtkApi.middleware,
        combineSlicesAvoidErrorMessageMiddleware,
        errorHandlerMiddleware,
      ),

    /**
     * Инициализация 'store' заранее подготовленными данными для тестов, 'storybook' и т.д.
     */
    preloadedState: initialState,

    /**
     * Установка редюсеров
     */
    reducer: rootReducer, // RTK v.2 code splitting
    /*
      RTK v.1 code splitting

      reducer: rootReducers, // возможна ошибка типов в поле 'middleware'

      reducer: reducerManager.reduce as Reducer<StateSchema>, // решение проблемы выше
    */
  });

  // store.reducerManager = reducerManager; // RTK v.1 code splitting

  return store;
};
