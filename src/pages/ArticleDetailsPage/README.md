## Страница с подробной информацией о статье

### Components

`AdditionalInfoContainer` - компонент с дополнительной информацией о статье

`ArticleDetailsComments` - компонент с комментариями к статье

`ArticleDetailsPage` - Основной компонент с детальной информацией о статье

`ArticleDetailsPageHeader` - Заголовок к основному компоненту с детальной информацией о статье

`DetailsContainer` - Контейнер-карточка для основного компонента с детальной информацией о статье

- Selectors

`getCanEditArticle` - Селектор для получения информации о том, можно ли редактировать статью

`getArticleCommentsAreLoading` - селектор для получения информации о состоянии загрузки комментариев к статье

`getArticleCommentsError` - селектор для получения информации об ошибке при получении комментариев к статье

`getArticleRecommendationsAreLoading` - Селектор для получения информации о состоянии загрузки рекомендаций к статье

`getArticleRecommendationsError` - Селектор для получения информации об ошибке при получении рекомендаций к статье

- Services

`addCommentForArticle` - Сервис для добавления комментария к статье

`fetchArticleRecommendations` - Сервис для получения рекомендаций к статье

`fetchCommentsByArticleId` - Сервис для получения комментариев по ID статьи

- Slices

`articleDetailsCommentsSlice` - Слайс для хранения информации о комментариях к статье

`articleDetailsPageRecommendationsSlice` - Слайс для хранения информации о рекомендациях к статье

`getArticleComments` - Селектор для получения нормализованных комментариев к статье

- Types

`ArticleDetailsCommentsSchema` - Тип, описывающий схему комментариев к статье в хранилище

`ArticleDetailsRecommendationsSchema` - Тип, описывающий схему рекомендаций к статье в хранилище

`ArticleDetailsPageSchema` - Тип, описывающий схему комментариев и рекомендаций к статье в хранилище
