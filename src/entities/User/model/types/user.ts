import type { FeatureFlags } from '@/shared/types/featureFlags';

import { UserRole } from '../consts';

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

    <BrowserRouter
      // подготовка к переходу на 'react-router-dom v.7'
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <StoreProvider />
    </BrowserRouter>

    Поэтому после успешной авторизации недоступна защищенная страница '/profile',
    для корректной работы нужен флаг 'mounted'
  */

  mounted: boolean;
}
