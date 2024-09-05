## Настройка HTTPS

1. Генерируем приватный **RSA ключ key.pem**: 

   `openssl genrsa -out ./json-server/key.pem`

2. Создаем запрос на получение сертификата и генерируем **csr.pem**:
 
   `openssl req -new -key ./json-server/key.pem -out ./json-server/csr.pem`

3. Подписываем сертификат приватным ключом и генерируем **cert.pem**: 

   `openssl x509 -req -days 9999 -in ./json-server/csr.pem -signkey ./json-server/key.pem -out ./json-server/cert.pem`

4. Удаляем **csr.pem**: 

   `rm ./json-server/csr.pem`

5. [Добавляем https и options](../json-server/index.js)

6. [Создаем httpsServer](../json-server/index.js)

7. При переходе на https://91.223.169.133:8443/ в браузере нужно согласиться на небезопасный 
   переход
   
   7.1. Должна появиться ошибка `{ "message": "AUTH ERROR" }`, а не страница с ошибкой,
        отдаваемая браузером
   
   7.2. Запросы в браузере по `HTTPS` должны успешно проходить

8. [Добавляем проксирование для backend в настройках nginx](../config/nginx/sites-enabled/default_with_ssl)

   Если не добавить проксирование, то после первого запроса на `backend` будет слетать
   безопасное соединение

9. Выставляем `API_URL`:

   9.1 `API_URL=https://ulbi_react/api/` в `.env` при сборке билда или

   9.2 `API_URL=https://ulbi-express-enpq-rn3wlg3vh-matt19111991s-projects.vercel.app/` в `Environment variables`
       на `Netlify`.
       
      Хэш для `API_URL` на `Vercel` будет меняться с каждым коммитом
