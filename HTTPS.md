**HTTPS**

1. Генерируем key.pem: `openssl genrsa -out ./json-server/key.pem`
2. Генерируем csr.pem: `openssl req -new -key ./json-server/key.pem -out ./json-server/csr.pem`
3. Генерируем cert.pem: `openssl x509 -req -days 9999 -in ./json-server/csr.pem -signkey ./json-server/key.pem -out ./json-server/cert.pem`
4. Удаляем csr.pem: `rm ./json-server/csr.pem`
5. [Добавляем https и options](./json-server/index.js)
6. [Создаем httpsServer](./json-server/index.js)
