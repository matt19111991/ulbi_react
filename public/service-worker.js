// 'self' - и есть сервис-воркер

self.addEventListener('install', (event) => {
  /*
    пока код, переданный внутрь 'waitUntil()', не завершится с успехом, —
    сервис-воркер не будет установлен
  */
  event.waitUntil(
    // создаем новый кеш с названием 'v1', это будет первая версия кеша
    caches.open('v1').then(cache => { // возвращается промис
      /*
        у объекта созданного кеша вызываем метод 'addAll()' и передаем массив
        относительных 'URL' всех ресурсов, которые хотим хранить в кеше
      */
      return cache.addAll(['/', '/index.html', '/manifest.json', '/favicon.ico']);
    })
  );
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

// слушаем событие 'push'
self.addEventListener('push', (event) => {
  event.waitUntil(self.registration.showNotification('Push notification test', {
    body: 'Body for push notification'
  }));
});
