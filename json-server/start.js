/*
  для обновления БД в режиме реального времени без перезапуска сервера и
  для перезапуска сервера в случае ошибок
*/
const nodemon = require('nodemon');

nodemon({
  ext: 'js json', // отслеживание изменений в файлах с этими расширениями
  script: 'json-server/index.js',
});

nodemon
  .on('start', () => {
    console.log('Server has been started with nodemon');
  })
  .on('quit', ()=> {
    console.log('Server has been quited');

    process.exit();
  })
  .on('restart', (files)  => {
    console.log(`Server restarted due to: ${files}`);
  });