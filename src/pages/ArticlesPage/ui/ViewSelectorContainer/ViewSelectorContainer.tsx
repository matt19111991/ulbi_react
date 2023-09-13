import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleView } from '@/entities/Article';

import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getArticlesPageView } from '../../model/selectors/articlesPageSelectors';

import { articlesPageActions } from '../../model/slice/articlesPageSlice';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(({ className }: ViewSelectorContainerProps) => {
  const dispatch = useAppDispatch();

  const view = useSelector(getArticlesPageView);

  const onChangeView = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesPageActions.setView(newView));
    },
    [dispatch],
  );

  return (
    <ArticleViewSelector className={className} onViewClick={onChangeView} selectedView={view} />
  );
});

ViewSelectorContainer.displayName = 'ViewSelectorContainer';
