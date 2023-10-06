import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

import SidebarArrowIcon from '@/shared/assets/icons/sidebar-arrow-redesigned.svg';
import SearchIcon from '@/shared/assets/icons/search-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { SortOrder } from '@/shared/types/sort';

import classes from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  /**
   * Статьи загружаются
   */
  areLoading: boolean;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Обработчик для изменения направления сортировки
   */
  onChangeOrder: (newOrder: SortOrder) => void;

  /**
   * Обработчик изменения поля поиска
   */
  onChangeSearch: (value: string) => void;

  /**
   * Обработчик для изменения поля сортировки
   */
  onChangeSort: (newSort: ArticleSortField) => void;

  /**
   * Обработчик изменения типа статьи для фильтрации
   */
  onChangeType: (type: ArticleType) => void;

  /**
   * Направление сортировки
   */
  order: SortOrder;

  /**
   * Поле поиска
   */
  search: string;

  /**
   * Поле сортировки
   */
  sort: ArticleSortField;

  /**
   * Тип статей
   */
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

    const [collapsedFilters, setCollapsedFilters] = useState(false);

    const onCollapse = () => {
      setCollapsedFilters((prev) => !prev);
    };

    return (
      <Card
        className={classNames(classes.ArticlesFilters, { [classes.collapsed]: collapsedFilters }, [
          className,
        ])}
        padding='24'
      >
        <VStack align='start' className={classes.stack} gap='32'>
          <Input
            addonLeft={<Icon Svg={SearchIcon} />}
            className={classNames(classes.search, { [classes.loading]: areLoading })}
            data-testid='Articles.Search'
            fullWidth
            onChange={onChangeSearch}
            placeholder={t('Поиск')}
            size='s'
            value={search}
          />

          <ArticleSortSelector
            className={classNames(classes.sort, { [classes.loading]: areLoading })}
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

          <HStack
            className={classNames(classes.collapseBtn, { [classes.collapsed]: collapsedFilters })}
          >
            <Icon clickable onClick={onCollapse} Svg={SidebarArrowIcon} />
          </HStack>
        </VStack>
      </Card>
    );
  },
);

ArticlesFilters.displayName = 'ArticlesFilters';
