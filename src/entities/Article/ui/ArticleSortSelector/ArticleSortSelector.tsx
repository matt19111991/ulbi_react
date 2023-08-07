import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { SortOrder } from 'shared/types/sort';

import { Select, SelectOption } from 'shared/ui/Select/Select';

import { ArticleSortField } from '../../model/consts/articleConsts';

import classes from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  order: SortOrder;
  sort: ArticleSortField;
}

export const ArticleSortSelector = memo(({
  className,
  onChangeOrder,
  onChangeSort,
  order,
  sort,
}: ArticleSortSelectorProps) => {
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      content: t('Возрастанию').toLowerCase(),
      value: 'asc',
    },
    {
      content: t('Убыванию').toLowerCase(),
      value: 'desc',
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      content: t('Дате создания').toLowerCase(),
      value: ArticleSortField.CREATED,
    },
    {
      content: t('Названию').toLowerCase(),
      value: ArticleSortField.TITLE,
    },
    {
      content: t('Просмотрам').toLowerCase(),
      value: ArticleSortField.VIEWS,
    },
  ], [t]);

  return (
    <div className={classNames(classes.ArticleSortSelector, {}, [className])}>
      <Select
        label={t('Сортировать по')}
        onChange={onChangeSort}
        options={sortFieldOptions}
        value={sort}
      />

      <Select
        label={t('по').toLowerCase()}
        onChange={onChangeOrder}
        options={orderOptions}
        value={order}
      />
    </div>
  );
});

ArticleSortSelector.displayName = 'ArticleSortSelector';
