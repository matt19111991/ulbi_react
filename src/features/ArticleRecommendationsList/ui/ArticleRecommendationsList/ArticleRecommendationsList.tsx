import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommedationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
  storybookError?: string;
}

export const ArticleRecommendationsList = memo(
  ({ className, storybookError }: ArticleRecommendationsListProps) => {
    const { t } = useTranslation('article-details');

    const { data = [], error: queryError, isLoading } = useGetArticleRecommendationsListQuery(4);

    const articles = __PROJECT__ === 'storybook' && storybookError ? [] : data;
    const error = __PROJECT__ === 'storybook' ? storybookError : queryError;

    if (error) {
      return (
        <HStack className={classNames('', {}, [className])} max>
          <Text theme={TextTheme.ERROR} title={t('Ошибка при загрузке рекомендаций')} />
        </HStack>
      );
    }

    return (
      <VStack
        align='start'
        className={classNames('', {}, [className])}
        data-testid='ArticleRecommendationsList'
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
  },
);

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList';
