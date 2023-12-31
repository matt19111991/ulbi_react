## Сущность статьи

- Constants

`ArticleBlockType` - тип блока для статьи

`ArticleSortField` - поле для сортировки статей

`ArticleType` - тип статьи

`ArticleView` - вид для списка статей

- Components

`ArticleCodeBlockComponent` - компонент с блоком, содержащим код

`ArticleDetails` - компонент с информацией о статье

`ArticleFormBlock` - компонент с формой создания блока

`ArticleImageBlockComponent` - компонент с блоком, содержащим изображение

`ArticleList` - компонент со списком статей

`ArticleListItem` - компонент-элемент списка статей

`ArticleListItemSkeleton` - компонент-элемент списка статей (состояние загрузки)

`ArticleTextBlockComponent` - компонент с блоком, содержащим текст

- Selectors

`getArticleDetailsData` - Селектор для получения информации о текущей открытой статье

`getArticleDetailsError` - Селектор для получения информации об ошибке при получении статьи

`getArticleDetailsIsLoading` - Селектор для получения информации о состоянии загрузки статьи

- Services

`fetchArticleById` - Сервис для загрузки статьи по ID

- Slices

`articleDetailsSlice` - Слайс для хранения информации о статье

- Types

`Article` - Тип, описывающий статью

`ArticleBlockBase` - Тип, описывающий общие параметры блока

`ArticleCodeBlock` - Тип, описывающий компонент с блоком, содержащим код

`ArticleImageBlock` - Тип, описывающий компонент с блоком, содержащим изображение

`ArticleTextBlock` - Тип, описывающий компонент с блоком, содержащим текст

`ArticleBlock` - Тип, описывающий один из трех блоков (код, изображение или текст)

`ArticleDetailsSchema` - Тип, описывающий схему статьи в хранилище
