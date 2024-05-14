## E2E-тестирование при помощи Cypress

### Fixtures

`article-details.json` - шаблон одной статьи 

`articles.json` - шаблон списка статей

`profile.json` - шаблон профиля

### Methods

`cy.addComment` - метод для создания комментария

`cy.createArticle` - метод для создания статьи

`cy.getByTestId` - метод для получения `DOM-элемента` по `testId`

`cy.login` - метод для аутентификации пользователя

`cy.mount` - метод для монтирования тестируемых компонентов

`cy.removeArticle` - метод для удаления статьи

`cy.removeRate` - метод для удаления рейтинга статьи

`cy.setRate` - метод для выставления рейтинга статье

### Helpers

`getDataTestIdSelector` - преобразование строкового значения `testId` в селектор `[data-testid='${testId}']`

### Support files

`cypress/support/component-index.html` - корневой `html-файл` для монтирования тестируемых сущностей (обязательный)

`cypress/support/component.ts` - корневой файл для тестирования компонентов (обязательный)

`cypress/support/e2e.ts` - корневой файл для `E2E-тестирования` (обязательный)
