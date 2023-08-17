import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';

import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  onChangeType: (type: ArticleType) => void;
  value: ArticleType;
}

export const ArticleTypeTabs = memo(({
  className,
  onChangeType,
  value,
}: ArticleTypeTabsProps) => {
  const { t } = useTranslation();

  const tabs = useMemo<TabItem[]>(() => [
    { content: t('Все статьи'), value: ArticleType.ALL },
    { content: t('Айти'), value: ArticleType.IT },
    { content: t('Наука'), value: ArticleType.SCIENCE },
    { content: t('Экономика'), value: ArticleType.ECONOMICS },
  ], [t]);

  const onTabClick = useCallback((tab: TabItem) => {
    onChangeType(tab.value as ArticleType);
  }, [onChangeType]);

  return (
    <Tabs
      className={classNames('', {}, [className])}
      onTabClick={onTabClick}
      tabs={tabs}
      value={value}
    />
  );
});

ArticleTypeTabs.displayName = 'ArticleTypeTabs';
