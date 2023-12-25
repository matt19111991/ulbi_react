export type {
  StateSchema,
  StateSchemaKey,
  ReduxStoreWithManager,
  ThunkConfig,
  ThunkExtraArg,
} from './config/StateSchema';

export type { AppDispatch } from './config/store';

export { createReduxStore, rootReducer } from './config/store';

export { StoreProvider } from './ui/StoreProvider';
