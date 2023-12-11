# Использование Docker в текущем проекте избыточно

# Здесь как пример аналога для .deploy/deploy.sh скрипта

###################################################################################

# Этап 1 (builder)

# Cобираем образ на основе Node v.21.4.0
FROM node:21.0-alpine3.17 as builder

# Копируем package.json файлы внутрь образа для ускорения сборки образов
COPY package.json package-lock.json ./

# Устанавливаем зависимости и создаем нужные папки
RUN npm install && mkdir /ulbi_react && mv ./node_modules ./ulbi_react

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
