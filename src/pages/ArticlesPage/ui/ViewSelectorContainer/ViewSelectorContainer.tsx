import { memo } from 'react';

import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(({ className }: ViewSelectorContainerProps) => {
  const { onChangeView, view } = useArticleFilters();

  return (
    <ArticleViewSelector className={className} onViewClick={onChangeView} selectedView={view} />
  );
});

ViewSelectorContainer.displayName = 'ViewSelectorContainer';
