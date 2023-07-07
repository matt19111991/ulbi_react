import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';

import { User, UserSchema } from './model/types/user';

export {
  getUserAuthData,
  User,
  userActions,
  userReducer,
  UserSchema,
};
