# Cобираем образ на основе 'Node' v.21.4.0 ('alpine' - легковесная версия 'Ubuntu')
FROM node:21.4-alpine

# Копируем урезанный 'package.json' файл внутрь образа для ускорения повторной установки модулей
COPY /docker/server/package*.json ./

# Обновляем 'npm'
RUN npm install -g npm@latest

# Копируем файлы для сервера в образ (из текущей локальной папки в корень рабочей директории)
COPY json-server /server

# Устанавливаем 'pm2' (process manager для управления процессами)
RUN npm install --loglevel error -g pm2

# Выставляем наружу 8000 порт
EXPOSE 8000

# Запускаем сервер в фоне из созданной папки 'server'
ENTRYPOINT ["pm2-runtime", "start", "server/index.js"]
