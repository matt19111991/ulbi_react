import type { FeatureFlags } from '@/shared/types/featureFlags';

import { UserRole } from '../consts/userConsts';

import type { JsonSettings } from './jsonSettings';

export interface User {
  id: string;
  avatar?: string;
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
  roles?: UserRole[];
  username: string;
}

export interface UserSchema {
  authData?: User;

  /*
    'AppRouter' отрисовывается быстрее, чем инициализируются данные о пользователя из 'Store':

    useEffect(() => {
      dispatch(initAuthData());
    }, [dispatch]);

    <BrowserRouter>
      <StoreProvider />
    </BrowserRouter>

    Поэтому после успешной авторизации недоступна защищенная страница '/profile',
    для корректной работы нужен флаг 'mounted'
  */

  mounted: boolean;
}
