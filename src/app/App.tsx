import { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { getUserMounted, initAuthData } from '@/entities/User';

import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { useAppToolbar } from './lib/hooks/useAppToolbar/useAppToolbar';

import { AppRouter } from './providers/Router';
import { withTheme } from './providers/ThemeProvider';

/*
  в большинстве случаев не стоит оборачивать в 'memo' компоненты с 'children':
    - 'children' могут быть объектами и от использования 'memo' не будет смысла
    - 'children' могут иметь древовидную структуру, а это накладно хранить в памяти

  но, если мы точно знаем, что 'children' - это примитив, тогда можно использовать обертку 'memo'
*/

const App = memo(() => {
  const dispatch = useAppDispatch();
  const Toolbar = useAppToolbar();

  const mounted = useSelector(getUserMounted);

  useEffect(() => {
    // инициализируем получение данных о пользователе, если приложение еще не было вмонтировано
    if (!mounted) {
      dispatch(initAuthData());
    }
  }, [dispatch, mounted]);

  if (!mounted) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <div className='app_redesigned' id='app'>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  // '<Suspense />' для переводов (ошибка, если пользователь не авторизован)

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      // приложение после редизайна
      on={
        <div className='app_redesigned' id='app'>
          <Suspense fallback=''>
            <Toaster
              position='top-center'
              toastOptions={{ className: 'toast redesigned', icon: '⛔' }}
            />

            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={Toolbar}
            />
          </Suspense>
        </div>
      }
      // приложение до редизайна
      off={
        <div className='app' id='app'>
          <Suspense fallback=''>
            <Toaster
              containerClassName='toastWrapper'
              position='top-center'
              toastOptions={{ className: 'toast deprecated', icon: '⛔' }}
            />

            <Navbar />

            <div className='content-page'>
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
});

App.displayName = 'App';

export default withTheme(App);
