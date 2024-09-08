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

      const total = self.contentToCache.length; // файлы для кэширования

      // счетчик установленных (добавленных на страницу) файлов
      let installed = 0;

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

            installed += 1;
          } else {
            console.info(`Service worker: Unable to fetch ${url} (${res.status})`);
          }
        } catch (e) {
          console.log(`Service worker: Unable to fetch ${url}, ${e.message}`);

          controller.abort(); // отменить запрос в любом случае
        }
      }));

      if (installed === total) {
        console.info(`Service worker: App successfully installed (${installed}/${total} files added in cache)`);
      } else {
        console.info(`Service worker: App partially installed (${installed}/${total} files added in cache)`);
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
    /*
      проверка сетевого запроса ресурса на соответствие какому-либо доступному
      в кэше ресурсу
    */
    caches.match(event.request).then(cache => {
      // возвращаем значение из кэша (если есть), иначе отправляем запрос
      return cache || fetch(event.request);
    }).catch(err => {
      console.log(`Service worker: Fetch error ${err.message} for ${event.request} request`)
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
    tag: "unique-tag", // чтобы избежать дублирования уведомлений
  };

  self.registration.showNotification(title, notificationOptions).then(() => {
    console.log(`Service worker: Push notification '${title}' has been send`)
  }).catch((err) => {
    console.error(`Service worker: Error ${err.message} for '${title}' notification`)
  });
});
