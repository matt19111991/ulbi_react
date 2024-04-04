## Сущность статьи

### Constants

`ArticleBlockType` - тип блока для статьи

`ArticleSortField` - поле для сортировки статей

`ArticleType` - тип статьи

`ArticleView` - вид для списка статей

### Components

`ArticleCodeBlockComponent` - компонент с блоком, содержащим код

!`ArticleDetails` - компонент с информацией о статье

!`ArticleFormBlock` - компонент с формой создания блока

`ArticleImageBlockComponent` - компонент с блоком, содержащим изображение

!`ArticleList` - компонент со списком статей

`ArticleListItem` - компонент-элемент списка статей

`ArticleListItemSkeleton` - компонент-элемент списка статей (состояние загрузки)

`ArticleTextBlockComponent` - компонент с блоком, содержащим текст

### Selectors

`getArticleDetailsData` - селектор для получения информации о текущей открытой статье

`getArticleDetailsError` - селектор для получения информации об ошибке при получении статьи

`getArticleDetailsIsLoading` - селектор для получения информации о состоянии загрузки статьи

### Services

`fetchArticleById` - сервис для загрузки статьи по `ID`

### Slices

`articleDetailsReducer` - редюсер c информацией о статье

`articleDetailsSlice` - слайс для хранения информации о статье

### Types

`Article` - тип, описывающий статью

`ArticleListItemProps` - тип, описывающий `props`, передаваемые в компонент-элемент списка статей

`ArticleBlockBase` - тип, описывающий общие параметры блока

`ArticleCodeBlock` - тип, описывающий компонент с блоком, содержащим код

`ArticleImageBlock` - тип, описывающий компонент с блоком, содержащим изображение

`ArticleTextBlock` - тип, описывающий компонент с блоком, содержащим текст

`ArticleBlock` - тип, описывающий один из трех блоков (код, изображение или текст)

`ArticleDetailsSchema` - тип, описывающий схему статьи в хранилище

