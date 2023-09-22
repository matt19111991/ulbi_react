import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserMounted, initAuthData } from '@/entities/User';

import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/Router';

/*
  В большинстве случаев не стоит оборачивать в 'memo' компоненты с 'children':
    - 'children' могут быть объектами (от использования 'memo' не будет смысла)
    - 'children' могут иметь древовидную структуру, а это накладно хранить в памяти

  Но, если мы точно знаем, что 'children' - это примитив, тогда можно использовать обертку 'memo'
*/

const App = () => {
  const dispatch = useAppDispatch();

  const mounted = useSelector(getUserMounted);

  useEffect(() => {
    // инициализируем данные о пользователе, только если приложение еще не было монтировано
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

  // <Suspense /> для переводов

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      // приложение после редизайна
      on={
        <div className='app_redesigned' id='app'>
          <Suspense fallback=''>
            <MainLayout content={<AppRouter />} header={<Navbar />} sidebar={<Sidebar />} />
          </Suspense>
        </div>
      }
      // приложение до редизайна
      off={
        <div className='app' id='app'>
          <Suspense fallback=''>
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
};

export default App;
