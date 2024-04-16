## Страница с подробной информацией о статье

### Components

`AdditionalInfoContainer` - компонент с дополнительной информацией о статье

`ArticleDetailsComments` - компонент с комментариями к статье

`ArticleDetailsPage` - Основной компонент с детальной информацией о статье

`ArticleDetailsPageHeader` - устаревший заголовок на странице с детальной информацией о статье

`DetailsContainer` - контейнер-карточка для страницы с детальной информацией о статье

### Selectors

`getCanEditArticle` - селектор для получения информации о том, можно ли редактировать статью

`getArticleCommentsAreLoading` - селектор для получения информации о состоянии загрузки комментариев к статье

`getArticleCommentsError` - селектор для получения информации об ошибке при получении комментариев к статье

`getArticleRecommendationsAreLoading` - Селектор для получения информации о состоянии загрузки рекомендаций к статье

`getArticleRecommendationsError` - Селектор для получения информации об ошибке при получении рекомендаций к статье

### Services

`addCommentForArticle` - сервис для добавления комментария к статье

`fetchArticleRecommendations` - Сервис для получения рекомендаций к статье

`fetchCommentsByArticleId` - сервис для получения комментариев по `ID` статьи

### Slices

`articleDetailsCommentsReducer` - редюсер для хранения информации о комментариях к статье

`articleDetailsCommentsSlice` - слайс для хранения информации о комментариях к статье

`articleDetailsPageRecommendationsSlice` - Слайс для хранения информации о рекомендациях к статье

`commentsAdapter` - адаптер с настройками для нормализации комментариев к статье

`getArticleComments` - объект с селекторами для получения нормализованных комментариев к статье


### Types

`ArticleDetailsCommentsSchema` - тип, описывающий схему комментариев к статье

`ArticleDetailsRecommendationsSchema` - Тип, описывающий схему рекомендаций к статье в хранилище

`ArticleDetailsPageSchema` - Тип, описывающий схему комментариев и рекомендаций к статье в хранилище
