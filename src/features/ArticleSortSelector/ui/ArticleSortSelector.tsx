import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Select, SelectOption } from '@/shared/ui/deprecated/Select';

import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { SortOrder } from '@/shared/types/sort';

import classes from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Обработчик для изменения направления сортировки
   */
  onChangeOrder: (newOrder: SortOrder) => void;

  /**
   * Обработчик для изменения поля сортировки
   */
  onChangeSort: (newSort: ArticleSortField) => void;

  /**
   * Направление сортировки
   */
  order: SortOrder;

  /**
   * Поле сортировки
   */
  sort: ArticleSortField;
}

export const ArticleSortSelector = memo(
  ({ className, onChangeOrder, onChangeSort, order, sort }: ArticleSortSelectorProps) => {
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        {
          content: t('Возрастанию').toLowerCase(),
          value: 'asc',
        },
        {
          content: t('Убыванию').toLowerCase(),
          value: 'desc',
        },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
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
      ],
      [t],
    );

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <div className={className}>
            <VStack align='start' gap='8'>
              <Text text={`${t('Сортировать по')}:`} />

              <ListBox items={sortFieldOptions} onChange={onChangeSort} value={sort} />

              <ListBox items={orderOptions} onChange={onChangeOrder} value={order} />
            </VStack>
          </div>
        }
        off={
          <div className={classNames(classes.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
              label={t('Сортировать по')}
              onChange={onChangeSort}
              options={sortFieldOptions}
              value={sort}
            />

            <Select<SortOrder>
              label={t('по').toLowerCase()}
              onChange={onChangeOrder}
              options={orderOptions}
              value={order}
            />
          </div>
        }
      />
    );
  },
);

ArticleSortSelector.displayName = 'ArticleSortSelector';
