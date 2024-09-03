## Push уведомления

Для работы `Push уведомлений` необходимо следующее:

1. Корректно работающий `PWA`

2. Библиотека `web-push`

3. Сгенерировать публичный и приватный `VAPID` ключи для сервиса уведомлений: ```web-push generate-vapid-keys```

4. Сохранить сгенерированные переменные в `VAPID_PRIVATE_KEY` и `VAPID_PUBLIC_KEY` в `.env` файле

5. Добавить прослушивание [push событий](../public/service-worker.js)

6. Добавить `VAPID` [ключи](../json-server/index.js)

7. Создать `/subscribe` и `POST /articles` (как пример) [роуты](../json-server/index.js)

8. Подписка на [уведомления](../src/index.tsx)

[Push Notification in React and Next.js app using Node.js](https://medium.com/@rajreetesh7/push-notification-in-react-and-next-js-app-using-node-js-da39ad1332ef)