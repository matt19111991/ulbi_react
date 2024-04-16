import { combineReducers } from '@reduxjs/toolkit';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice/articleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers({
  comments: articleDetailsCommentsReducer,

  /*
    при необходимости можно объединять данные для статьи (комментарии) с рекомендациями
    recommendations: recommendationsReducer,
  */
});
