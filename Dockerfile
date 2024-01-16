# Использование 'Docker' в текущем проекте избыточно

# Здесь как пример создания аналога '.deploy/deploy.sh' скрипта

###################################################################################

# Этап 1 (builder)

# Cобираем образ на основе 'Node' v.21.4.0
FROM node:21.4-alpine as builder

# Копируем 'package.json' файлы внутрь образа для ускорения сборки образов
COPY package.json package-lock.json ./

# Устанавливаем зависимости
    # 'npm ci' использует 'package-lock.json' файл для установки точных версий зависимостей,
    # позволяет 'Docker' кэшировать зависимости для более быстрой сборки

    # --loglevel error - собираем только ошибки в логах 'npm'
    # --ignore-scripts - отключаем 'npm' скрипты, в том числе и команду 'postinstall' для очистки
    #   кэша после установки новых модулей
RUN npm ci --loglevel error --ignore-scripts

# Cоздаем нужные папки
RUN mkdir ./ulbi_react && mv node_modules ./ulbi_react

# Задаем рабочую директорию в образе
WORKDIR /ulbi_react

# Копируем все локальные файлы в образ (из текущей локальной папки в корень WORKDIR)
COPY . .

# Собираем build
RUN npm run build:prod

###################################################################################

# Этап 2 (nginx)

# Используем базовый образ для nginx
FROM nginx:alpine

# Копируем локальный конфиг nginx в папку с nginx в образе
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf

# Удаляем nginx index page, заданную по умолчанию
RUN rm -rf /usr/share/nginx/html/*

# Копируем все файлы из этапа 1 в корневое расположение, откуда он может обслуживать содержимое
COPY --from=builder /ulbi_react/build /usr/share/nginx/html

# выставляем наружу 80 порт
EXPOSE 80

# задаем точку входа для nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
