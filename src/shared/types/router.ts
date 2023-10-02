import { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  /**
   * Только для авторизованных пользователей
   */
  authOnly?: boolean;

  /**
   * Список ролей пользователя
   */
  roles?: UserRole[];
};
