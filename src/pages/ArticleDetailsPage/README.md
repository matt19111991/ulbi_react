## Страница с подробной информацией о статье

### Components

`AdditionalInfoContainer` - компонент с дополнительной информацией о статье

`ArticleDetailsComments` - компонент с комментариями к статье

`ArticleDetailsPage` - основной компонент с детальной информацией о статье

`ArticleDetailsPageHeader` - устаревший заголовок на странице с детальной информацией о статье

`DetailsContainer` - контейнер-карточка для страницы с детальной информацией о статье

### Selectors

`getArticleCommentsAreLoading` - селектор для получения информации о состоянии загрузки комментариев к статье

`getArticleCommentsError` - селектор для получения информации об ошибке при получении комментариев к статье

`getCanEditArticle` - селектор для получения информации о том, можно ли редактировать статью

### Services

`addCommentForArticle` - сервис для добавления комментария к статье

`fetchCommentsByArticleId` - сервис для получения комментариев по `ID` статьи

### Slices

`articleDetailsCommentsReducer` - редюсер для хранения информации о комментариях к статье

`articleDetailsCommentsSlice` - слайс для хранения информации о комментариях к статье

`articleDetailsPageReducer` - редюсер для хранения всей информации о статье

`commentsAdapter` - адаптер с настройками для нормализации комментариев к статье

`getArticleComments` - объект с селекторами для получения нормализованных комментариев к статье


### Types

`ArticleDetailsCommentsSchema` - тип, описывающий схему комментариев к статье

`ArticleDetailsPageSchema` - тип, описывающий полную схему статьи (с комментариями и по желанию с рекомендациями)
