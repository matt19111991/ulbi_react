import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';

import { rtkApi } from 'shared/api/rtkApi';

import { classNames } from 'shared/lib/classNames/classNames';

import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';

interface ArticleRecommendationsListProps {
  className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({ // 'getArticleRecommendationsList' - название эндпоинта
      query: (limit) => ({
        params: {
          _limit: limit,
        },
        url: '/articles',
      }),
    }),
  }),
});

const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;

export const ArticleRecommendationsList = memo(({
  className,
}: ArticleRecommendationsListProps) => {
  const { t } = useTranslation('article-details');

  const { data: articles = [], error, isLoading } = useArticleRecommendationsList(4);

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
    >
      <Text size={TextSize.L} title={t('Рекомендуем')} />

      <ArticleList
        articles={articles}
        inline
        isLoading={isLoading}
        target='_blank'
        virtualized={false}
      />
    </VStack>
  );
});

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList';
