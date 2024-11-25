import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { getUserAuthData, getUserMounted, getUserRoles, UserRole } from '@/entities/User';

import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
  /**
   * Только для авторизованных пользователей
   */
  authOnly?: boolean;

  /**
   * Содержимое компонента
   */
  children: ReactElement;

  /**
   * Обязательные роли у пользователя для отображения компонента
   */
  requiredRoles?: UserRole[];
}

export const RequireAuth = ({ authOnly, children, requiredRoles }: RequireAuthProps) => {
  const location = useLocation();

  const auth = useSelector(getUserAuthData);
  const mounted = useSelector(getUserMounted);
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    // если не заданы обязательные роли => у пользователя есть полный доступ
    if (!requiredRoles) {
      return true;
    }

    // проверяем на совпадение ролей 'requiredRoles' в роуте и ролей пользователя 'userRoles'
    return requiredRoles.some((requiredRole) => userRoles?.includes(requiredRole));
  }, [requiredRoles, userRoles]);

  if (mounted) {
    if (location.state?.from && auth && hasRequiredRoles) {
      /*
        если в роутере хранится предыдущее значение приватного роута, пользователь авторизован и
        у него есть права для посещения этого роута =>
        переходим по этому роуту и очищаем предыдущее состояние роута
      */
      return <Navigate replace state={null} to={location.state.from} />;
    }

    if (!auth && authOnly) {
      /*
        сохраняем значение защищенного роута, на который хотели бы перейти, чтобы после
        успешной аутентификации перевести пользователя на этот защищенный роут

        просто захардкодить '/' - не лучший 'user experience'
      */
      return <Navigate replace state={{ from: location.pathname }} to={getRouteMain()} />;
    }

    if (!hasRequiredRoles) {
      /*
        условие на проверку необходимых ролей должно идти после условия 'if (!auth && authOnly)', иначе
        находясь на странице с панелью администратора и нажав 'Logout()', получим 'Forbidden' страницу
      */
      return <Navigate replace state={null} to={getRouteForbidden()} />;
    }

    return children;
  }

  return null;
};
