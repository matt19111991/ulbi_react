##Настройка SSL

1 Идем на сайт https://letsencrypt.org и далее на https://certbot.eff.org

2 
- Проверка snap версии: `snap --version`
- Устанавливаем snapd (если не установлен): `sudo apt install snapd`
- Проверка обновлений snapd: `sudo snap install core; sudo snap refresh core`

3 Удаляем предыдущие установки Certbots: `sudo apt-get remove certbot`

4 Устанавливаем Certbot: `sudo snap install --classic certbot`

5 Подготовка Certbot: `sudo ln -s /snap/bin/certbot /usr/bin/certbot`

6 Выбираем автоматическую настройку для nginx (указываем в опроснике действующий email и доменное имя):
 `sudo certbot --nginx`

7 Если возникла ошибка "Could not automatically find a matching server block for ulbireact.ru. 
  Set the 'server_name' directive to  use the Nginx installer"
  
  Нужно указать 'server_name' в /etc/nginx/sites-enabled/default и перезапустить nginx

8 Если возникла ошибка "Mixed Content: The page at 'https://ulbireact.ru/' was loaded over HTTPS,
  but requested an insecure XMLHttpRequest endpoint 'http://91.223.169.133:8000/login'. 
  This request has been blocked; the content must be served over HTTPS."
  
  - Нужно наш json server [настроить под HTTPS](https.md)
  - Добавить [проксирование через nginx](../config/nginx/sites-enabled/default)
