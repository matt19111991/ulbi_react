import type {
  StateSchema,
  StateSchemaKey,
  ReduxStoreWithManager,
  ThunkExtraArg,
} from './config/StateSchema';

import { AppDispatch, createReduxStore } from './config/store';

import { StoreProvider } from './ui/StoreProvider';

export {
  AppDispatch,
  createReduxStore,
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
  StoreProvider,
  ThunkExtraArg,
};
