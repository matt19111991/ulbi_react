// Здесь можем создавать различные пользовательские команды и перезаписывать существующие

import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(ratingCommands);

/*
// Перезаписываем команду
Cypress.Commands.overwrite('intercept', (data) => {
  const { FIXTURE_MODE } = process.env; // получаем 'FIXTURE_MODE' извне

  // заглушки
  const createFixture = (name: string, str: string) => str;
  const readFixture = (name: string) => name;
  const readFromServer = () => {};
  const hash = (str: string) => str;

  const { body = '', method = 'GET', url } = data as Partial<Request>;

  const fixtureName = method + url + hash(body as string);

  switch (FIXTURE_MODE) {
    case 'READ': { // считываем данные фикстур из существующих файлов
      readFixture(fixtureName);
      break;
    }

    case 'WRITE': { // данные из 'data' записываем в файлы с фикстурами
      createFixture(fixtureName, body as string);
      break;
    }

    case 'API': { // работаем без фикстур (через сервер); например для релизной ветки
      readFromServer();
      break;
    }

    default:
      break;
  }
});
*/

/* Child command
   Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... });
*/

/* Dual command
   Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... });
*/

export {}; // нужно хоть что-то экспортировать, чтобы не ругался TS
