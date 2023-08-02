import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';

import { classNames } from 'shared/lib/classNames/classNames';

import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';

import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommedationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(({
  className,
}: ArticleRecommendationsListProps) => {
  const { t } = useTranslation('article-details');

  const { data: articles = [], error, isLoading } = useGetArticleRecommendationsListQuery(4);

  if (error) {
    return (
      <VStack
        className={classNames('', {}, [className])}
        gap='8'
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Ошибка при загрузке рекоммендаций')}
        />
      </VStack>
    );
  }

  return (
    <VStack
      className={classNames('', {}, [className])}
      gap='8'
      max
    >
      <Text size={TextSize.L} title={t('Рекомендуем')} />

      <ArticleList
        articles={articles}
        isLoading={isLoading}
        target='_blank'
        virtualized={false}
      />
    </VStack>
  );
});

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList';
