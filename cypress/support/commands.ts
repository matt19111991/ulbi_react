// здесь можем создавать различные пользовательские команды и перезаписывать существующие

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
  // перезапись существующих команд

  Cypress.Commands.overwrite('intercept', (data) => {
    const { FIXTURE_MODE } = process.env; // получаем 'FIXTURE_MODE' извне

    // функции-заглушки
    const createFixture = (name: string, str: string) => str;
    const readFixture = (name: string) => name;
    const readFromServer = () => {};
    const hash = (str: string) => str;

    const { body = '', method = 'GET', url } = data as Partial<Request>;

    const fixtureName = method + url + hash(body as string);

    switch (FIXTURE_MODE) {
      case 'READ': {
        readFixture(fixtureName); // считываем данные фикстур из существующих файлов
        break;
      }

      case 'WRITE': {
        createFixture(fixtureName, body as string); // данные из 'data' записываем в файлы с фикстурами
        break;
      }

      case 'API': {
        readFromServer(); // работаем без фикстур (через сервер), например для релизной ветки
        break;
      }

      default:
        break;
    }
  });
*/

/*
  Child command

  Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... });
*/

/*
  Dual command

  Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... });
*/
