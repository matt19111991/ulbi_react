import { UserRole } from '../consts/userConsts';

export interface User {
  id: string;
  avatar?: string;
  roles?: UserRole[],
  username: string;
}

export interface UserSchema {
   authData?: User;

/* AppRouter отрисовывается быстрее, чем инициализируются данные о пользователя из 'Store':

   useEffect(() => {
      dispatch(userActions.initAuthData());
   }, [dispatch]);

   <BrowserRouter>
      <StoreProvider />
   </BrowserRouter>

   Поэтому после успешной авторизации недоступна защищенная страница '/profile'
   Для корректной работы нужен флаг 'mounted'

*/ mounted: boolean;
}
