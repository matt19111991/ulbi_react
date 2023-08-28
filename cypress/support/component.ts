/*
  Этот файл обрабатывается и загружается автоматически перед тестовыми файлами
  Здесь размещаем глобальную конфигурацию; можно изменить расположение этого файла
*/

import { mount } from 'cypress/react18';

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
