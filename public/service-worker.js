// 'self' - и есть сервис-воркер

// код для события 'install' взят из интернета

/*
  в событии 'install' можно инициализировать кэш и добавлять в него файлы для
  использования в автономном режиме
*/
self.addEventListener('install', (event) => {
  self.skipWaiting(); // сервис-воркер активируется сразу после завершения установки

  /*
    пока код, переданный внутрь 'waitUntil()', не завершится с успехом, —
    сервис-воркер не будет установлен
  */
  event.waitUntil((async () => {
    // 'self.cacheName' и 'self.contentToCache' доступны при импорте скрипта
    try {
      // создаем новый кэш с названием 'self.cacheName'
      const cache = await caches.open(self.cacheName);

      if (self.contentToCache) {
        await Promise.all(self.contentToCache.map(async (url) => {
          let controller;

          try {
            controller = new AbortController();

            const { signal } = controller;

            const req = new Request(url, {
              /*
                заставит браузер запросить любой из ресурсов через сеть,
                что позволяет избежать повторного кэширования старых файлов
              */
              cache: 'reload',
            });

            const res = await fetch(req, { signal });

            if (res && res.status === 200) {
              await cache.put(req, res.clone()); // запрос успешен - сохраняем в кэш
            }
          } catch (e) {
            console.log(`Service worker: Unable to fetch ${url}, ${e.message}`);

            controller.abort(); // отменить запрос в любом случае
          }
        }));
      }
    } catch (e) {
      console.error(`Service worker: Unable to install app, ${e.message}`);
    }
  })());
});

// удаление старого кэша (код для события 'activate' взят из интернета)
self.addEventListener('activate', (event) => {
  /*
    пока код, переданный внутрь 'waitUntil()', не завершится с успехом, —
    сервис-воркер не будет активирован
  */
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();

    await Promise.all(cacheNames.map(async (cacheName) => {
      if (self.cacheName !== cacheName) {
        await caches.delete(cacheName);
      }
    }));
  })());
});

/*
  событие 'fetch' возникает каждый раз, когда запрашиваются любые
  подконтрольные сервис-воркеру ресурсы
 */
self.addEventListener('fetch', (event) => {
  const { method, url } = event.request;

  // получение подписок не кэшируем
  if (method === 'GET' && url.endsWith('subscriptions')) {
    return false;
  }

  // получение статей не кэшируем
  if (method === 'GET' && url.includes('articles')) {
    return false;
  }

  event.respondWith( // обработка ответов
    (async () => {
      try {
        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) {
          return cachedResponse; // возвращаем значение из кэша (если есть)
        }

        // иначе отправляем запрос
        const networkResponse = await fetch(event.request);

        if (networkResponse) {
          return networkResponse;
        }
      } catch (err) {
        /*
         'catch' срабатывает, скорее всего, из-за сетевой ошибки,
          если 'fetch' возвращает допустимый 'HTTP'-ответ с кодом ответа
          4xx или 5xx, то 'catch' не будет вызван
        */
        console.log(`Service worker: Fetch error ${err.message} for ${event.request} request`)

        // пробуем вернуть кэш
        const cacheResponse = await caches.match(event.request);

        if (cacheResponse) {
          return cacheResponse;
        }
      }
    })()
  );
});

// событие 'push' срабатывает, когда сервер отправляет 'push' уведомление клиенту
self.addEventListener("push", (event) => {
  const isValidJSON = (str) => {
    try {
      JSON.parse(str);

      return true;
    } catch (e) {
      return false;
    }
  };

  // данные для 'event.data' собираются в 'middleware' для 'push' уведомлений на сервере
  const isValidEventMessage = isValidJSON(event.data.text());

  if (!isValidEventMessage) {
    console.error('Service worker: Push event data incorrect structure. Should be object');

    return;
  }

  const { body = '', data, icon = '', title = '' } = event.data.json();

  const { url = '' } = data;

  const notificationOptions = {
    body,
    data: {
      url, // 'URL' для редиректа пользователя на нужную страницу
    },
    icon,
    tag: Math.random(), // чтобы избежать дублирования уведомлений
  };

  self.registration.showNotification(title, notificationOptions).catch((err) => {
    console.error(`Service worker: Error ${err.message} for '${title}' notification`)
  });
});
