## SEO

Search engine optimization

### Ранжирование

Сортировка сайтов поисковыми системами и размещение их в результатах поисковой выдачи

### Индексация
 
Сбор, анализ и хранение данных сайта. Производится при помощи поисковых роботов (краулеров)

### Анализируются:
- текст
- `<html lang='en' />`
- мета-теги
  - кодировка
  - `viewport`
  - `title`
  - `description`
  - `keywords`
  - `robots`
- микроразметка (`Open Graph`)
- `robots.txt`
- `sitemap.xml`
- служебные данные
- изображения
- видео
- другой контент

### На результат ранжирования влияют:
- контент
- популярность
- уникальность
- скорость
- удобство / юзабилити
- доступность / семантическая верстка (один `h1` на страницу, ...)
- глубина отказов
- география ресурса
- количество страниц
- навигация
- поддержка мобильных устройств
- `uptime` (время бесперебойной работы)

### ЧПУ

Человекопонятный (friendly) `URL`:
~~https://cars.ru/auto/123/model/456~~
https://cars.ru/auto/bmw/model/m5

### Canonical ссылки

Позволяют избавиться от дубликатов при индексации страниц

Один и тот же контент может отображаться по разным урлам:
- https://ulbireact.netlify.app/articles/last_article
- https://ulbireact.netlify.app/articles/last_category/last_article
- https://ulbireact.netlify.app/user/jack/articles/last_article

но мы задаем только одну страницу как первоисточник, а остальные считаем дубликатами

[Статья](https://blog.arealidea.ru/seo-blitz/canonical)

### Robots.txt

[Правила использования robots.txt](https://yandex.ru/support/webmaster/controlling-robot/robots-txt.html#recommend)

### Sitemap.xml

Строится из канонических ссылок

Есть необходимость в этом файле, если:
- большое количество страниц
- отдельные страницы без навигационных ссылок
- глубокая вложенность

[Использование Sitemap.xml](https://yandex.ru/support/webmaster/controlling-robot/sitemap.html)
