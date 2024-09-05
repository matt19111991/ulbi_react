const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const https = require('https');
const jsonServer = require('json-server');
const path = require('path');
const os = require('os');

// библиотека для 'push' уведомлений
const { sendNotification, setVapidDetails } = require('web-push');

dotenv.config({ path: './.env' }); // для чтения 'VAPID' ключей

const server = jsonServer.create();

// Библиотека 'cross-env' позволяет передавать 'NODE_ENV' переменные в 'Windows'

const isDevelopment = server.settings.env === 'development';

/*
  Нужно использовать временное хранилище для 'db.json' в 'production' режиме,
  иначе '500 Internal Server Error' для 'POST' и 'PUT' запросов:
  "Error: erofs: read-only file system, open '/var/task/db.json' at object.opensync (node:fs:601:3)
  at writefilesync (node:fs:2249:35) at filesync.write"
*/
if (!isDevelopment) {
  fs.copyFile('db.json', `${os.tmpdir()}/db.json`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Copy file succeed to ${os.tmpdir()}`);
    }
  });
}

const dbPath = isDevelopment
  ? path.resolve(__dirname, 'db.json')
  : path.resolve(`${os.tmpdir()}/db.json`);

const router = jsonServer.router(dbPath);

/*
  список подписок на 'push' уведомления: кому будут приходить 'push' уведомления
  после отправки 'POST' запроса на '/subscribe'
*/
let subscriptions = [];

/*
 'VAPID' ключи позволяют серверу отправлять 'push' уведомления в браузеры без
  использования таких служб, как 'Firebase Cloud Messaging' или 'AWS';
  их легко сгенерировать и избежать подключения и настройки сервисов выше
*/
const vapidKeys = {
  privateKey: process.env.VAPID_PRIVATE_KEY,
  publicKey: process.env.VAPID_PUBLIC_KEY,
};

// middleware для небольшой задержки, чтобы запрос проходил не мгновенно; имитация реального API
server.use(async (req, res, next) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  next();
});

// middleware для работы CORS
server.use(cors());

// middleware для проверки: авторизован ли пользователь
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  return next();
});

// middleware для 'push' уведомлений
server.use((req, res, next) => {
  console.log('subscriptions', subscriptions)

  // отправляем 'push' уведомление только на создание новой статьи
  if (req.method === 'POST' && req.url === '/articles') {
    const payload = {
      body: "New article has been created",
      data: {
        url: "https://matt610.ru",
      },
      icon: "https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg",
      title: "New article",
    };

    Promise.all(
      /*
        отправляем 'push' уведомление всем подписчикам; можно отправлять
        определенному пользователю, отфильтровав массив подписок
      */
      subscriptions.map((subscription) =>
        sendNotification(subscription, JSON.stringify(payload))
      )
    ).catch((err) => {
      console.log('---catch---', err);
      subscriptions = []; // очищаем все подписки (для простоты)
    });
  }

  return next();
});

server.use(jsonServer.defaults());

// иначе в роутах 'req.body === undefined'
server.use(jsonServer.bodyParser);

// '/login' endpoint (POST)
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

    const { users } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'USER NOT FOUND' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/*
  сохраняем объект подписки в массиве подписок, этот массив будет использоваться
  для отправки 'push' уведомлений всем подписчикам (можно хранить в базе данных)
*/
server.post("/subscribe", (req, res) => {
  const { body } = req;
  console.log('body in /subscribe', body)

  const isSubscribed = subscriptions.find(subscription =>
    subscription.endpoint === body.subscription.endpoint ||
    subscription.userAgent === body.userAgent
  );

  console.log('isSubscribed', isSubscribed)

  // избегаем дубликатов подписок
  if (!isSubscribed) {
    // настройка 'web-push' библиотеки
    setVapidDetails(
      body.subscription.endpoint, // должен быть 'URL' соответствующей подписки
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    subscriptions.push(body);
  }

  return res.status(201).json({ message: 'Subscribed successfully on push notifications' });
});

// должно быть после описания всех роутов
server.use(router);

if (isDevelopment) {
  // HTTP сервер (80 порт по умолчанию) для локальной разработки

  const httpServer = http.createServer(server);

  const HTTP_PORT = 8000;

  httpServer.listen(HTTP_PORT, () => {
    console.log(`--- Server is running on ${HTTP_PORT} port ---`);
  });
} else {
  // HTTPS сервер (443 порт по умолчанию) для 'production' сборки

  const options = {
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  };

  const httpsServer = https.createServer(options, server);

  // меняем порт на 8443, чтобы избежать потенциальных конфликтов с фронтом и 'nginx'
  const HTTPS_PORT = 8443;

  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`--- Server is running on ${HTTPS_PORT} port ---`);
  });
}

// обязательно экспортируем переменную с сервером
module.exports = server;
