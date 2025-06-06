const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const https = require('https');
const jsonServer = require('json-server');
const path = require('path');
const os = require('os');

// библиотека для 'push' уведомлений
const {
  getVapidHeaders,
  sendNotification,
  setVapidDetails,
} = require('web-push');

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
 'VAPID' ключи позволяют серверу отправлять 'push' уведомления в браузеры без
  использования таких служб, как 'Firebase Cloud Messaging' или 'AWS';
  их легко сгенерировать и избежать подключения и настройки сервисов выше
*/
const vapidKeys = {
  privateKey: process.env.VAPID_PRIVATE_KEY,
  publicKey: process.env.VAPID_PUBLIC_KEY,
};

// дефолтные middleware от 'json-server'
// server.use(jsonServer.defaults());

// middleware для небольшой задержки, чтобы запрос проходил не мгновенно; имитация реального API
server.use(async (req, res, next) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  next();
});

// middleware для чтения БД в режиме реального времени (для актуализации данных)
server.use((req, res, next) => {
  router.db.read();

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

// иначе в роутах 'req.body === undefined'
server.use(jsonServer.bodyParser);

// middleware для 'push' уведомлений
server.use(async (req, res, next) => {
  const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

  const { subscriptions = [], ...dbFile } = db;

  // отправляем 'push' уведомление только на создание новой статьи
  if (req.method === 'POST' && req.url === '/articles') {
    const { title } = req.body;

    const payload = {
      body: `New article '${title}' has been created`,
      data: {
        url: "https://matt610.ru",
      },
      icon: "https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg",
      title: "New article",
    };

    /*
     при первой же ошибке 'Promise.all()' выбрасывает исключение и прекращает дальнейшую работу:
     (не отрабатывает 'next()', поэтому используем 'Promise.allSettled()')
    */
    await Promise.allSettled(
      /*
        отправляем 'push' уведомление всем подписчикам; можно отправлять
        определенному пользователю, отфильтровав массив подписок
      */
      subscriptions.map((subscription) => {
        const parsedUrl = new URL(subscription.endpoint);

        const audience = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

        // без заголовков получим 401 ошибку (взято из документации)
        const headers = getVapidHeaders(
          audience, // 'origin' 'push' сервиса
          subscription.endpoint, // 'mailto' или 'URL' подписки
          vapidKeys.publicKey,
          vapidKeys.privateKey,
          'aes128gcm' // тип используемого кодирования ('aesgcm', 'aes128gcm')
        );

        return sendNotification(subscription, JSON.stringify(payload), { headers });
      })
    ).then((results) => {
      let correctSubscriptions = [...subscriptions];

      results
        .filter(({ status }) => status === 'rejected') // отфильтровываем ошибки
        .forEach(({ reason }) => {
          console.log('--- Push middleware error ---', reason);

          // удаляем подписку в случае ошибки
          correctSubscriptions = correctSubscriptions.filter(subscription =>
            subscription.endpoint !== reason.endpoint
          );
        });

      const updatedDb = {
        ...dbFile,
        subscriptions: correctSubscriptions,
      };

      fs.writeFileSync(dbPath, JSON.stringify(updatedDb, null, 2));
    });

    return next();
  }

  return next();
});

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

// '/articles' endpoint (POST)
server.post('/articles', (req, res) => {
  try {
    const { id: articleId, userId, ...body } = req.body;

    const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

    const { articles = [], users = [], ...dbFile } = db;

    let newArticleId = '0';

    if (articleId === 'cy_test') {
      newArticleId = articleId;
    } else if (articles.length) {
      const lastArticleId = +articles.at(-1).id + 1;

      newArticleId = lastArticleId.toString();
    }

    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const newArticle = {
      ...body,
      createdAt: `${day}.${month}.${year}`,
      id: newArticleId,
      views: 0,
    }

    const updatedDb = {
      articles: [...articles, { ...newArticle, userId }],
      ...dbFile,
      users,
    };

    fs.writeFileSync(dbPath, JSON.stringify(updatedDb, null, 2));

    const userToExpand = users.find(user => user.id === userId);

    const response = {
      ...newArticle,
      user: userToExpand
    };

    return res.status(201).json({ article: response });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/*
  сохраняем объект подписки в массиве подписок, этот массив будет использоваться
  для отправки 'push' уведомлений всем подписчикам (можно хранить в базе данных)
 '/subscribe' endpoint (POST)
*/
server.post("/subscribe", (req, res) => {
  const { body } = req;

  const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

  const { subscriptions = [], ...dbFile } = db;

  const isSubscribed = subscriptions.find(subscription =>
    subscription.endpoint === body.subscription.endpoint ||
    subscription.userAgent === body.userAgent
  );

  // избегаем дубликатов подписок
  if (!isSubscribed) {
    // настройка 'web-push' библиотеки
    setVapidDetails(
      body.subscription.endpoint, // должен быть 'URL' соответствующей подписки
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    const newSubscription = {
      ...body.subscription,
      token: body.token,
      userAgent: body.userAgent,
    };

    const updatedDb = {
      ...dbFile,
      subscriptions: [...subscriptions, newSubscription]
    };

    fs.writeFileSync(dbPath, JSON.stringify(updatedDb, null, 2));
  }

  return res.status(201).json({ message: 'Subscribed successfully on push notifications' });
});

/*
  отписка от 'push' уведомлений по переданному 'userAgent' и 'id' пользователя
 '/unsubscribe' endpoint (POST)
*/
server.post("/unsubscribe", (req, res) => {
  const { body } = req;

  const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

  const { subscriptions = [], ...dbFile } = db;

  const updatedSubscriptions = subscriptions.filter((subscription) =>
    subscription.token !== body.token && subscription.userAgent !== body.userAgent,
  )

  const updatedDb = {
    ...dbFile,
    subscriptions: updatedSubscriptions,
  };

  fs.writeFileSync(dbPath, JSON.stringify(updatedDb, null, 2));

  return res.status(200).json({ message: 'Unsubscribed successfully' });
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
