import { createRoot } from 'react-dom/client';
import { BrowserRouter /* , createBrowserRouter , RouterProvider */ } from 'react-router-dom';

import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/app/providers/ForceUpdate';
import { StoreProvider } from '@/app/providers/StoreProvider';
// import { ThemeProvider } from '@/app/providers/ThemeProvider';

import App from '@/app/App';

// import i18n from '@/shared/config/i18n/i18n' - возможна ошибка 'i18n.changeLanguage is not a function'
import '@/shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import './app/styles/index.scss';

/*
  Ошибка 'Uncaught Error: useNavigate() may be used only in the context of a <Router> component.',
  если 'StoreProvider' находится в дереве выше чем 'BrowserRouter' и попытаться использовать навигацию в
  'async thunks'
*/

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер root не найден. Не удалось вмонтировать React приложение');
}

/*
  Ошибка при деструктуризации: 'const { render } = createRoot(container);'
  'Uncaught TypeError: Cannot read properties of undefined (reading '_internalRoot')'
*/

const root = createRoot(container);

/*
  вместо '<BrowserRouter />' можно использовать 'createBrowserRouter()' и '<RouterProvider />',
  это позволяет описывать роуты в виде объектов, а не 'JSX'-компонентов

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          element: <AboutPage />,
          path: '/about',
        },
        {
          element: <SettingsPage />,
          path: '/settings',
        },
      ],
    },
  ]);

  root.render(<RouterProvider router={router} />);
*/

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          {/*
            можно использовать 'ThemeProvider':
              <ThemeProvider>
                <App />
              </ThemeProvider>,

            или же 'HOC' 'withTheme' в 'App.tsx'
          */}

          <App />
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);

if ('serviceWorker' in navigator) {
  // событие 'load' происходит, когда ресурсы приложения закончили загружаться
  window.addEventListener('load', async () => {
    // после загрузки всех ресурсов

    // получаем список всех регистраций сервис-воркеров
    const registrations = await navigator.serviceWorker.getRegistrations();

    // проверка для того, чтобы не дублировать сервис-воркеры
    for (const registration of registrations) {
      const registeredUrl = registration.active?.scriptURL;
      const urlToRegister = `${window.location.href}service-worker.js`;

      // если сервис-воркер уже был зарегистрирован
      if (registeredUrl === urlToRegister) {
        await registration.unregister(); // отписываемся от него
      }
    }

    // если 'push' уведомления не разрешены
    if (Notification.permission !== 'granted') {
      // запрашиваем разрешение на уведомления
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        // отображается только для 'HTTPS'
        new Notification('Notifications are allowed!!!');
      }
    }

    // регистрируем сервис-воркер
    const registration = await navigator.serviceWorker.register('/service-worker.js');

    // подписка на 'push' уведомления
    const subscription = await registration.pushManager.subscribe({
      applicationServerKey: __VAPID_KEY__, // 'VAPID' публичный ключ

      // без этого флага возможна некорректная работа в 'Chrome' и 'Edge'
      userVisibleOnly: true,
    });

    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

    /*
      после того как пользователь подписывается и авторизован,
      отправляем объект подписки на сервер
    */
    if (token) {
      await fetch(`${__API__}/subscribe`, {
        body: JSON.stringify(subscription),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }
  });
} else {
  console.log('Текущий браузер не поддерживает сервис-воркеры');
}
