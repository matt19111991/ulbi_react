import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article } from '@/entities/Article';

import { fetchArticleRecommendations } from '../../services/fetchArticleRecommendations/fetchArticleRecommendations';

import { ArticleDetailsRecommendationsSchema } from '../../types/ArticleDetailsRecommendationsSchema';

const initialState: ArticleDetailsRecommendationsSchema = {
  areLoading: false,
  entities: {},
  error: undefined,
  ids: [],
};

/*
  для рекомендаций используем НОРМАЛИЗАЦИЮ ДАННЫХ:

  вместо массива рекомендаций будем использовать:
    - объект (ключ - 'id' рекомендации, значение - сама рекомендация)
    - массив айдишников рекомендаций (для ссылок на сами рекомендации)

  эта оптимизация позволяет (например, при обновлении одной рекомендации):
    - не итерироваться по всему списку рекомендаций и по итогу менять всего одну рекомендацию,
      а менять точечно по ключу одну рекомендацию

    - избежать дублирования данных в 'Redux store' / локально:
     'recommendation', 'editedRecommendation', 'draftRecommendation', 'onModerationRecommendation'

    - сложность не 'O(n)', а 'O(1)'
*/

// адаптер с настройками для нормализации данных
const recommendationsAdapter = createEntityAdapter<Article>({
  /*
    если уникальное значение у рекомендации будет не 'id', а 'recommendationId':
    selectId: (recommendation) => recommendation.recommendationId,

    массив с айдишниками будет отсортирован на основе поля 'title':
    sortComparer: (a, b) => a.title.localeCompare(b.title),
  */
});

export const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendations',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.areLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.areLoading = false;

        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.areLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
