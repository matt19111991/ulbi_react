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

/* Child command
   Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... });
*/

/* Dual command
   Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... });
*/

/* This will overwrite an existing command
   Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... });
*/

export {}; // нужно хоть что-то экспортировать, чтобы не ругался TS
