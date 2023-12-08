import { combineReducers } from '@reduxjs/toolkit';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice/articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice/articleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers({
  comments: articleDetailsCommentsReducer,
  recommendations: articleDetailsPageRecommendationsReducer,
});
