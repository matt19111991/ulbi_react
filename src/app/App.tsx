import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppRouter } from 'app/providers/router';

import { userActions } from 'entities/User';

import { classNames } from 'shared/lib/classNames/classNames';

import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

/*
    В большинстве случаев не стоит оборачивать в 'memo' компоненты с 'children':
      - 'children' могут быть объектами (от использования 'memo' не будет смысла)
      - 'children' могут иметь древовидную структуру, а это накладно хранить в памяти

    Но, если мы точно знаем, что 'children' - это примитив, тогда можно использовать обертку 'memo'
*/
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return  (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback=''> {/* <Suspense /> для переводов */}
        <Navbar />

        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
