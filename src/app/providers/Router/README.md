## Провайдер для роутинга

### Configuration
- Доступ к компонентам в зависимости от состояния аутентификации
- Доступ к компонентам по ролям
- Компоненты, отрисовываемые по роуту
- Пути для роутинга

### Components

`AppRouter` - основной компонент роутинга в приложении

`RequireAuth` - компонент-обертка для проверки доступности роута пользователю на основе имеющихся ролей и 
состояния аутентификации

### Routes
- Main: `/`
- About: `/about`
- Admin panel: `/admin`
- Article create: `/articles/new`
- Article details: `/articles/:id`
- Article edit: `/articles/:id/edit`
- Articles: `/articles`
- Forbidden: `/forbidden`
- Profile: `/profile/:id`
- Settings: `/settings`

### Types

`AppRouteProps` - тип, описывающий `props` для роутов, включая роли пользователя и состояние аутентификации
