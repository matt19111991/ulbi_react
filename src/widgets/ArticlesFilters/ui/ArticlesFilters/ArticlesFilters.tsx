import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

import SearchIcon from '@/shared/assets/icons/search-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { SortOrder } from '@/shared/types/sort';

import classes from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  areLoading: boolean;
  className?: string;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSearch: (value: string) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
  order: SortOrder;
  search: string;
  sort: ArticleSortField;
  type: ArticleType;
}

export const ArticlesFilters = memo(
  ({
    areLoading,
    className,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type,
  }: ArticlesFiltersProps) => {
    const { t } = useTranslation();

    return (
      <Card className={classNames(classes.ArticlesFilters, {}, [className])} padding='24'>
        <VStack align='start' gap='32'>
          <Input
            addonLeft={<Icon Svg={SearchIcon} />}
            className={classNames('', { [classes.loading]: areLoading })}
            fullWidth
            onChange={onChangeSearch}
            placeholder={t('Поиск')}
            value={search}
          />

          <ArticleSortSelector
            className={classNames('', { [classes.loading]: areLoading })}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            order={order}
            sort={sort}
          />

          <ArticleTypeTabs
            className={classNames(classes.tabs, { [classes.loading]: areLoading })}
            onChangeType={onChangeType}
            value={type}
          />
        </VStack>
      </Card>
    );
  },
);

ArticlesFilters.displayName = 'ArticlesFilters';
