import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

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
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<TextRedesigned title={t('Ошибка при загрузке рекомендаций')} variant='error' />}
            off={
              <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Ошибка при загрузке рекомендаций')}
              />
            }
          />
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
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<TextRedesigned size='l' title={t('Рекомендуем')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Рекомендуем')} />}
        />

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
