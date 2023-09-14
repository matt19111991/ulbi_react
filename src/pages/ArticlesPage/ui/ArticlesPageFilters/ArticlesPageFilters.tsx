import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleView } from '@/entities/Article';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

import classes from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
  const { t } = useTranslation();

  const {
    areLoading,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view,
  } = useArticleFilters();

  return (
    <div className={classNames('', {}, [className])}>
      <div
        className={classNames(
          classes.sortWrapper,
          { [classes.cutWidth]: view === ArticleView.PLATE },
          [],
        )}
      >
        <ArticleSortSelector
          className={classNames('', { [classes.loading]: areLoading })}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          order={order}
          sort={sort}
        />

        <ArticleViewSelector onViewClick={onChangeView} selectedView={view} />
      </div>

      <Card
        className={classNames(
          classes.search,
          { [classes.cutWidth]: view === ArticleView.PLATE },
          [],
        )}
      >
        <Input
          className={classNames('', { [classes.loading]: areLoading })}
          fullWidth
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
          value={search}
        />
      </Card>

      <ArticleTypeTabs
        className={classNames(classes.tabs, { [classes.loading]: areLoading })}
        onChangeType={onChangeType}
        value={type}
      />
    </div>
  );
});

ArticlesPageFilters.displayName = 'ArticlesPageFilters';
