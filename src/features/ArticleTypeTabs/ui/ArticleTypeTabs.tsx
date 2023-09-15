import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { TabItem } from '@/shared/types/ui';

import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';

import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  onChangeType: (type: ArticleType) => void;
  value: ArticleType;
}

export const ArticleTypeTabs = memo(({ className, onChangeType, value }: ArticleTypeTabsProps) => {
  const { t } = useTranslation();

  const tabs = useMemo<TabItem[]>(
    () => [
      { content: t('Все статьи'), value: ArticleType.ALL },
      { content: t('Айти'), value: ArticleType.IT },
      { content: t('Наука'), value: ArticleType.SCIENCE },
      { content: t('Экономика'), value: ArticleType.ECONOMICS },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Tabs
          className={classNames('', {}, [className])}
          direction='column'
          onTabClick={onTabClick}
          tabs={tabs}
          value={value}
        />
      }
      off={
        <TabsDeprecated
          className={classNames('', {}, [className])}
          onTabClick={onTabClick}
          tabs={tabs}
          value={value}
        />
      }
    />
  );
});

ArticleTypeTabs.displayName = 'ArticleTypeTabs';
