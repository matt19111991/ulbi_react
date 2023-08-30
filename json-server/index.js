const cors = require('cors');
const fs = require('fs');
const https = require('https');
const jsonServer = require('json-server');
const path = require('path');

const options = {
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

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

// login endpoint (POST)
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

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

// создаем HTTPS сервер
const httpsServer = https.createServer(options, server);

/*
  443 порт по умолчанию для HTTPS
  меняем на 8443, чтобы избежать потенциальных конфликтов с фронтом и nginx
*/
const PORT = 8443;

// запуск сервера c HTTPS
httpsServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`---Server is running on ${PORT} port---`);
});

/*
  запуск сервера до перехода на HTTPS

  server().listen(8000, () => {
    // eslint-disable-next-line no-console
    console.log('---Server is running on 8000 port---');
  });
*/
