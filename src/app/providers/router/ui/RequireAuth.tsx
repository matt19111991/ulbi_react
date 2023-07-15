import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData, getUserMounted } from 'entities/User';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();

  const auth = useSelector(getUserAuthData);
  const mounted = useSelector(getUserMounted);

  if (!auth && mounted) {
    /* сохраняем значение защищенного роута, на который хотели перейти, чтобы после
       успешной авторизации перевести пользователя на этот защищенный роут

       просто захардкодить '/' - не лучший user experience
    */

    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  return children;
};
