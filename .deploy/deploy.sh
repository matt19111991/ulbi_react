# Скрипт для автоматизации действий при деплое (на сервере)

# Нужно дать файлу разрешение на выполнение
# chmod +x .deploy/deploy.sh

# для работы Npm на сервере (чтобы избежать ошибки 'npm: command not found')
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

# идем в папку с проектом
cd ~/ulbi_react

# делаем сборку
npm run build:prod

# удаляем прошлую сборку
rm -rf ~/../var/www/ulbi_react/html

# переносим папку с билдом в папку для статики
mv ~/ulbi_react/build ~/../var/www/ulbi_react/html
