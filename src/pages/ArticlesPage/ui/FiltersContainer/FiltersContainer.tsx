import { memo } from 'react';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
  const {
    areLoading,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
    onChangeSort,
    order,
    search,
    sort,
    type,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      areLoading={areLoading}
      className={className}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
      order={order}
      search={search}
      sort={sort}
      type={type}
    />
  );
});

FiltersContainer.displayName = 'FiltersContainer';
