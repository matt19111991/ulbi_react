# Cобираем образ на основе 'Node' v.22 ('alpine' - легковесная версия 'Ubuntu')
FROM node:22-alpine

# Копируем урезанный 'package.json' файл внутрь образа для ускорения повторной установки модулей
COPY /docker/server/package*.json ./

# Обновляем 'npm'
RUN npm install -g npm@latest

# Устанавливаем зависимости
    # 'npm ci' использует 'package-lock.json' файл для установки точных версий зависимостей,
    # ускоряет установку, но удаляет 'node_modules' целиком
    # Статья: https://coderoad.ru/52499617/%D0%92-%D1%87%D0%B5%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-npm-install-%D0%B8-npm-ci

    # Поэтому используем 'npm install'
        # --loglevel error - собираем только ошибки в логах 'npm'
        # --ignore-scripts - отключаем 'npm' скрипты, в том числе и команду 'postinstall' для очистки
        #                    кэша после установки новых модулей
RUN npm install --loglevel error --ignore-scripts

# Cоздаем отдельную папку и переносим 'node_modules' внутрь на верхний уровень
# для решения возможных проблем c привязкой зависимостей в подкаталогах для 'Windows' или 'MacOS'
# Статья: https://www.docker.com/blog/keep-nodejs-rockin-in-docker
RUN mkdir ./json-server && mv node_modules ./json-server

# Копируем файлы для сервера в образ (из локальной папки 'ulbi_react/json-server' в 'корень образа/json-server')
COPY json-server /json-server

# Выставляем наружу 8000 порт
EXPOSE 8000

# Устанавливаем 'cross-env' глобально, иначе ошибка 'sh: cross-env: not found'
RUN npm install -g cross-env@latest

# Запускаем сервер в фоне
ENTRYPOINT ["npm", "run", "start:server:dev"]
