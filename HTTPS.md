**HTTPS**

1. Генерируем key.pem: `openssl genrsa -out ./json-server/key.pem`
2. Генерируем csr.pem: `openssl req -new -key ./json-server/key.pem -out ./json-server/csr.pem`
3. Генерируем cert.pem: `openssl x509 -req -days 9999 -in ./json-server/csr.pem -signkey ./json-server/key.pem -out ./json-server/cert.pem`
4. Удаляем csr.pem: `rm ./json-server/csr.pem`
5. [Добавляем https и options](./json-server/index.js)
6. [Создаем httpsServer](./json-server/index.js)
7. [Добавляем проксирование для backend в настройках nginx](./config/nginx/sites-enabled/default)
   Если не добавить проксирование, то после первого запроса на backend будет слетать
   безопасное соединение 
8. Выставляем API_URL=https://ulbi_react/api в .env при сборке билда
