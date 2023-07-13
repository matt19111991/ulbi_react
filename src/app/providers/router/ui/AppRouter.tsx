import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getUserAuthData } from 'entities/User';

import { routeConfig } from 'shared/config/routeConfig/routeConfig';

import { PageLoader } from 'widgets/PageLoader';

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => {
      if (!isAuth) { // если пользователь не авторизован
        if (route.authOnly) { // отсекаем все роуты с параметром 'authOnly'
          return false;
        }

        return true;
      }

      return true;
    });
    }, [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}> {/* <Suspense /> для роутинга */}
      <Routes>
        {routes.map(({ element, path }) => (
          <Route
            element={(<div className='page-wrapper'>{element}</div>)}
            key={path}
            path={path}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
