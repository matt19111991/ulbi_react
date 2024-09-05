// 'self' - и есть сервис-воркер

self.addEventListener('install', (event) => {
  // prevents the waiting, meaning the service worker activates
  // as soon as it's finished installing
  // NOTE: don't use this if you don't want your sw to control pages
  // that were loaded with an older version
  self.skipWaiting();

  event.waitUntil((async () => {
    try {
      // self.cacheName and self.contentToCache are imported via a script
      const cache = await caches.open(self.cacheName);
      const total = self.contentToCache.length;
      let installed = 0;

      await Promise.all(self.contentToCache.map(async (url) => {
        let controller;

        try {
          controller = new AbortController();
          const { signal } = controller;
          // the cache option set to reload will force the browser to
          // request any of these resources via the network,
          // which avoids caching older files again
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req, { signal });

          if (res && res.status === 200) {
            await cache.put(req, res.clone());
            installed += 1;
          } else {
            console.info(`unable to fetch ${url} (${res.status})`);
          }
        } catch (e) {
          console.info(`unable to fetch ${url}, ${e.message}`);
          // abort request in any case
          controller.abort();
        }
      }));

      if (installed === total) {
        console.info(`application successfully installed (${installed}/${total} files added in cache)`);
      } else {
        console.info(`application partially installed (${installed}/${total} files added in cache)`);
      }
    } catch (e) {
      console.error(`unable to install application, ${e.message}`);
    }
  })());
});

// remove old cache if any
self.addEventListener('activate', (event) => {
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
  event.respondWith( // обработка ответов
    /*
      проверка сетевого запроса ресурса на соответствие какому-либо доступному
      в кэше ресурсу
    */
    caches.match(event.request).then(cache => {
      // возвращаем значение из кэша (если есть), иначе отправляем запрос
      return cache || fetch(event.request);
    }).catch(err => {
      console.log(`Fetch error ${err} for ${event.request} request`)
    })
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
  console.log("---isValidEventMessage---", isValidEventMessage);

  if (!isValidEventMessage) {
    console.error('Push event data incorrect structure. Should be object');

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
    tag: "unique-tag", // чтобы избежать дублирования уведомлений
  };

  console.log("notificationOptions", notificationOptions);

  self.registration.showNotification(title, notificationOptions).then(() => {
    console.log(`Push notification '${title}' has been send`)
  }).catch((err) => {
    console.log(`Push send error ${err} for '${title}' notification`)
  });
});
