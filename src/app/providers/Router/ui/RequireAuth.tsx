import { JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData, getUserMounted, getUserRoles, UserRole } from '@/entities/User';

import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const location = useLocation();

  const auth = useSelector(getUserAuthData);
  const mounted = useSelector(getUserMounted);
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    // если не заданы роли => у пользователя есть полный доступ
    if (!roles) {
      return true;
    }

    // проверяем на совпадение ролей, указанных в роуте ('roles') и ролей пользователя ('userRoles')
    return roles.some((requiredRole) => userRoles?.includes(requiredRole));
  }, [roles, userRoles]);

  if (!auth && mounted) {
    /* сохраняем значение защищенного роута, на который хотели перейти, чтобы после
       успешной авторизации перевести пользователя на этот защищенный роут

       просто захардкодить '/' - не лучший user experience
    */

    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  /*
    условие на проверку необходимых ролей должно идти после условия 'if (!auth && mounted)', иначе
    находясь на странице с панелью администратора и нажав 'Logout()', получим 'Forbidden' страницу
  */
  if (!hasRequiredRoles && mounted) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
  }

  return children;
};
