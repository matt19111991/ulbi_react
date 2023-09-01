# Использование Docker в текущем проекте избыточно

# Здесь как пример аналога для .deploy/deploy.sh скрипта

# Cобираем образ на основе Node v.18.16.0
FROM node:18-alpine3.16

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

# Используем базовый образ для nginx
FROM nginx:alpine

# Копируем локальный конфиг nginx в папку с nginx в образе
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
