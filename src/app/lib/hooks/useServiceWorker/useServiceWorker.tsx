import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

/**
 * Хук для подключения сервис воркера
 */
export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // событие 'load' происходит, когда ресурсы приложения закончили загружаться
      window.addEventListener('load', async () => {
        // после загрузки всех ресурсов

        // получаем список всех регистраций сервис-воркеров
        const registrations = await navigator.serviceWorker.getRegistrations();

        // проверка для того, чтобы не дублировать сервис-воркеры
        for (const registration of registrations) {
          console.log('registrations', registrations);
          const registeredUrl = registration.active?.scriptURL;
          const urlToRegister = `${window.location.href}service-worker.js`;

          // если сервис-воркер уже был зарегистрирован
          if (registeredUrl === urlToRegister) {
            console.log('---unregister---');
            await registration.unregister(); // отписываемся от него
          }
        }

        // если 'push' уведомления не разрешены
        if (Notification.permission !== 'granted') {
          // запрашиваем разрешение на уведомления
          const permission = await Notification.requestPermission();
          console.log('permission', permission);

          if (permission === 'granted') {
            // отображается только для 'HTTPS'
            const notification = new Notification('Notifications are allowed!!!', {
              body: 'Test notify',
              silent: false,
            });

            console.log('notification', notification);
          }
        }

        // регистрируем сервис-воркер
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('registration', registration);

        // подписка на 'push' уведомления
        try {
          const subscription = await registration.pushManager.subscribe({
            applicationServerKey: __VAPID_KEY__, // 'VAPID' публичный ключ

            // без этого флага возможна некорректная работа в 'Chrome' и 'Edge'
            userVisibleOnly: true,
          });
          console.log('subscription', subscription);

          const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
          console.log('token', token);
          /*
            после того как пользователь подписывается и авторизован,
            отправляем объект подписки на сервер
          */
          if (token) {
            await fetch(`${__API__}/subscribe`, {
              body: JSON.stringify({
                subscription,
                userAgent: navigator.userAgent,
              }),
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });
          }
        } catch (e) {
          const message = e instanceof Error ? e.message : 'Unexpected error';

          const options = {
            duration: 10000,
            style: { lineHeight: '24px' },
          };

          toast(message, options);
        }
      });
    } else {
      console.log("Current browser doesn't support service workers");
    }
  }, []);
};
