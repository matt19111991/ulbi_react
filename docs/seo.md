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
  - `charset`
  - `viewport`
  - `title`
  - `description`
  - `keywords`
  - `robots`
- микроразметка
  - `Open Graph`
  - `Schema.org`
- `AMP` - accelerated mobile pages (быстрые мобильные приложения)
- `robots.txt`
- `sitemap.xml`
- редиректы
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
- https://matt610.netlify.app/articles/last_article
- https://matt610.netlify.app/articles/last_category/last_article
- https://matt610.netlify.app/user/jack/articles/last_article

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

### Core Web Vitals

- `LCP` - Largest Contentful Paint - загружена самая большая часть контента 
          Best: 2.5 - 4.0 s
- `FID` - First Input Delay - время до первой интерактивности
          Best: 100 - 300 ms
- `CLS` - Cumulative Layout Shift - визуальная стабильность
          Best: 0.1 - 0.25 s 

### AMP

Accelerated mobile pages

`Google` лучше продвигает `AMP` страницы

[Статья](https://www.calltouch.ru/blog/chto-takoe-amp-straniczy-i-kak-ih-ispolzovat)

### Редиректы

Нужно обрабатывать редиректы:
- с `www` на без `www` 
- с `http` на `https` 
- со страниц без `/` в конце на страницы с `/` в конце 
- со страниц с верхним регистром на страницы с нижним регистром
- с `index.html` или `index.php` на главную 

### Микроразметка

Нужно зайти на [сайт](https://search.google.com/search-console/welcome) и закачать
в корень проекта файл подтверждения вида `google0ba6d230b9204219.html`

[Preview](https://search.google.com/test/rich-results)

[Валидация](https://validator.schema.org)

[Статья](https://www.unisender.com/ru/glossary/chto-takoe-mikrorazmetka-sajta)
