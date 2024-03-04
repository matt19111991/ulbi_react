export { UserRole } from './model/consts';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserMounted } from './model/selectors/getUserMounted/getUserMounted';

export { useJsonSettings } from './model/selectors/getUserJsonSettings/getUserJsonSettings';

export {
  getUserRoles,
  isUserAdmin,
  isUserManager,
} from './model/selectors/getUserRoleSelectors/getUserRoleSelectors';

export { initAuthData } from './model/services/initAuthData/initAuthData';
export { saveJsonSettings } from './model/services/saveJsonSettings/saveJsonSettings';

export { userActions, userReducer, userSlice } from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/user';
