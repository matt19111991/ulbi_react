## E2E-тестирование при помощи Cypress

### Components

`EditableProfileCard` - редактируемый компонент карточки профиля

### Constants

`FRONT_APP_URL` - `URL` фронтенд приложения

### Fixtures

`article-details.json` - шаблон одной статьи 

`articles.json` - шаблон списка статей

`profile.json` - шаблон профиля

### Helpers

`getDataTestIdSelector` - преобразование строкового значения `testId` в селектор `[data-testid='${testId}']`

### Methods

`cy.addComment` - метод для создания комментария

`cy.articlesAreReady` - метод для проверки наличия списка статей в `DOM`

`cy.createArticle` - метод для создания статьи

`cy.getByTestId` - метод для получения `DOM-элемента` по `testId`

`cy.login` - метод для аутентификации пользователя

`cy.mount` - метод для монтирования тестируемых компонентов

`cy.removeArticle` - метод для удаления статьи

`cy.removeRate` - метод для удаления рейтинга статьи

`cy.resetProfile` - метод для сброса изменений в профиле

`cy.searchArticles` - метод для поиска статей

`cy.setRate` - метод для выставления рейтинга статье

`cy.sortArticlesByField` - метод для сортировки статей по полю (дата создания, название, просмотры)

`cy.sortArticlesByOrder` - метод для сортировки статей по названию (по возрастанию / убыванию)

`cy.sortArticlesByType` - метод для сортировки статей по типу статьи (экономика, IT, наука)

`cy.updateProfile` - метод для обновления профиля

`cy.waitForArticlesUpdates` - метод для ожидания завершения обновлений списка статей

`cy.waitForTheFirstKotlinArticle` - метод для ожидания появления первой статьи о `Kotlin` в `DOM`

### Support files

`cypress/support/component-index.html` - корневой `html-файл` для монтирования тестируемых сущностей (обязательный)

`cypress/support/component.ts` - корневой файл для тестирования компонентов (обязательный)

`cypress/support/e2e.ts` - корневой файл для `E2E-тестирования` (обязательный)
