import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';

import { classNames } from 'shared/lib/classNames/classNames';

import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';

import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommedationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
  storybookError?: string;
  storybookLoading?: boolean;
}

export const ArticleRecommendationsList = memo(({
  className,
  storybookError,
  storybookLoading,
}: ArticleRecommendationsListProps) => {
  const { t } = useTranslation('article-details');

  const {
    data = [],
    error: queryError,
    isLoading: queryLoading,
  } = useGetArticleRecommendationsListQuery(4);

  const articles = __PROJECT__ === 'storybook' && (storybookLoading || storybookError) ? [] : data;
  const error = __PROJECT__ === 'storybook' ? storybookError : queryError;
  const isLoading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;

  if (error) {
    return (
      <HStack
        className={classNames('', {}, [className])}
        max
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Ошибка при загрузке рекоммендаций')}
        />
      </HStack>
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
