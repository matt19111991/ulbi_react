import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

const SUBSCRIBE_ENDPOINT = 'subscribe';

const getNotificationPermissionsIcon = (permission: NotificationPermission): string => {
  switch (permission) {
    case 'denied':
      return '🔒';

    case 'granted':
      return '🔑';

    case 'default':
      return '🔒';

    default:
      return '🔒';
  }
};

/**
 * Хук для подключения сервис воркера
 */
export const useServiceWorker = () => {
  useEffect(() => {
    (async () => {
      if ('serviceWorker' in navigator) {
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

        toast(`Notification permissions: ${Notification.permission}`, {
          icon: getNotificationPermissionsIcon(Notification.permission),
          position: 'bottom-center',
        });

        // если 'push' уведомления не разрешены
        if (Notification.permission !== 'granted') {
          // запрашиваем разрешение на уведомления
          await Notification.requestPermission();
        }

        // регистрируем сервис-воркер
        const registration = await navigator.serviceWorker.register('/service-worker.js');

        /*
          откладываем выполнение кода, пока не активируется сервис-воркер,
          чтобы избежать ошибок "Failed to execute 'subscribe' on 'PushManager':
          Subscription failed - no active Service Worker"
        */
        await navigator.serviceWorker.ready;

        // подписка на 'push' уведомления
        try {
          const subscription = await registration.pushManager.subscribe({
            applicationServerKey: __VAPID_KEY__, // 'VAPID' публичный ключ

            // без этого флага возможна некорректная работа в 'Chrome' и 'Edge'
            userVisibleOnly: true,
          });

          const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

          /*
            после того как пользователь авторизован и создана подписка,
            отправляем объект подписки на сервер
          */
          if (token) {
            await fetch(`${__API__}${SUBSCRIBE_ENDPOINT}`, {
              body: JSON.stringify({
                subscription,
                token,
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

          toast(message, {
            style: { lineHeight: '24px' },
          });
        }
      } else {
        console.log("Current browser doesn't support service workers");
      }
    })();
  }, []);
};
