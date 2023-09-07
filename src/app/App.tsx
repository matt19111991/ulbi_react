import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserMounted, initAuthData } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts';

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
    dispatch(initAuthData());
  }, [dispatch]);

  if (!mounted) {
    return <PageLoader />;
  }

  // <Suspense /> для переводов

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      // приложение после редизайна
      on={
        <div className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback=''>
            <MainLayout content={<AppRouter />} header={<Navbar />} sidebar={<Sidebar />} />
          </Suspense>
        </div>
      }
      // приложение до редизайна
      off={
        <div className={classNames('app', {}, [])}>
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
