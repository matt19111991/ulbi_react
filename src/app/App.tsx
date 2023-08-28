import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserMounted, userActions } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Navbar } from '@/widgets/Navbar';
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
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback=''> {/* <Suspense /> для переводов */}
        <Navbar />

        <div className='content-page'>
          <Sidebar />

          {mounted && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
