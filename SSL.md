**Настройка SSL и HTTPS**

1 Идем на сайт https://letsencrypt.org и далее на https://certbot.eff.org

2 
- Проверка snapd версии: `snapd --version`
- Устанавливаем snapd (если не установлен): `sudo apt install snapd`
- Проверка обновлений snapd: `sudo snap install core; sudo snap refresh core`

3 Удаляем предыдущие установки Certbots: `sudo apt-get remove certbot`

4 Устанавливаем Certbot: `sudo snap install --classic certbot`

5 Подготовка Certbot: `sudo ln -s /snap/bin/certbot /usr/bin/certbot`

6 Выбираем автоматическую настройку для nginx (указываем в опроснике действующий email и доменное имя):
 `sudo certbot --nginx`

7 Если возникла ошибка "Could not automatically find a matching server block for ulbi_react.ru. 
  Set the 'server_name' directive to  use the Nginx installer"
  
  Нужно указать 'server_name' в /etc/nginx/sites-enabled/default  

8 Если возникла ошибка "Mixed Content: The page at 'https://ulbi_react.ru' was loaded over HTTPS,
  but requested an insecure XMLHttpRequest endpoint 'http://103.13.210.44/login'. 
  This request has been blocked; the content must be server over HTTPS."
  
  Нужно настроить HTTPS для Node.js (json-server/index.js)
