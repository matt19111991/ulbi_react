# Использование 'Docker' в текущем проекте избыточно

# Здесь как пример создания аналога '.deploy/deploy.sh' скрипта

# Создание образа: docker build -t ulbi .
# Создание и запуск контейнера: docker run --rm -d -p 80:80 ulbi

###################################################################################

# Этап 1 (builder)

# Cобираем образ на основе 'Node' v.21.4.0 ('alpine' - легковесная версия 'Ubuntu')
FROM node:21.4-alpine as builder

# Копируем 'package.json' файлы внутрь образа для ускорения повторной установки модулей
COPY package.json package-lock.json ./

# Обновляем 'npm'
RUN npm install -g npm@10.3.0

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
RUN mkdir ./ulbi_react && mv node_modules ./ulbi_react

# Задаем рабочую директорию в образе
WORKDIR /ulbi_react

# Задаем глобальную переменную для API
ENV API_URL="http://localhost:8000"

# Копируем все локальные файлы в образ (из текущей локальной папки в корень 'WORKDIR')
COPY . .

# Собираем build
RUN npm run build:prod

# Устанавливаем 'pm2' (process manager для управления процессами)
RUN npm install --loglevel error -g pm2

# Выставляем наружу 8000 порт
EXPOSE 8000

# Запускаем сервер в фоне
ENTRYPOINT ["pm2-runtime", "start", "json-server/index.js"]

###################################################################################

# Этап 2 (nginx)

# Используем базовый образ для 'nginx'
FROM nginx:alpine

# Удаляем 'index.html' страницу 'nginx' и конфиги, заданные по умолчанию
RUN rm -rf /usr/share/nginx/html/*

RUN rm ./etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/conf.d/*

# Копируем файлы билда из этапа 1 в корневое расположение для статики 'nginx', откуда он может обслуживать содержимое
COPY --from=builder /ulbi_react/build /usr/share/nginx/html

# Копируем локальные конфиги 'nginx' в папку с 'nginx' в образе
COPY ./config/nginx/nginx_docker.conf ./etc/nginx/nginx.conf
COPY ./config/nginx/sites-enabled/default_docker.conf ./etc/nginx/conf.d/default.conf

# Выставляем наружу 80 порт
EXPOSE 80

# Задаем точку входа для 'nginx'
ENTRYPOINT ["nginx", "-g", "daemon off;"]
