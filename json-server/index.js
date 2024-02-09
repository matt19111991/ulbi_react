const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
const jsonServer = require('json-server');
const path = require('path');
const os = require('os');

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
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Copy file succeed to ${os.tmpdir()}`);
    }
  });
}

const dbPath = isDevelopment
  ? path.resolve(__dirname, 'db.json')
  : path.resolve(`${os.tmpdir()}/db.json`);

const router = jsonServer.router(dbPath);

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

// должно быть после описания всех роутов
server.use(router);

if (isDevelopment) {
  // HTTP сервер (80 порт по умолчанию) для локальной разработки

  const httpServer = http.createServer(server);

  const HTTP_PORT = 8000;

  httpServer.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.log(`--- Server is running on ${HTTPS_PORT} port ---`);
  });
}

// обязательно экспортируем переменную с сервером
module.exports = server;
