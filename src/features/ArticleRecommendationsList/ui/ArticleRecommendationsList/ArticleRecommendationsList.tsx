import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi';

import classes from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Пробрасываемая ошибка из 'storybook'
   */
  storybookError?: string;

  /**
   * Пробрасываемое состояние загрузки из 'storybook'
   */
  storybookLoading?: boolean;
}

export const ArticleRecommendationsList = memo(
  ({ className, storybookError, storybookLoading }: ArticleRecommendationsListProps) => {
    const { t } = useTranslation('article-details');

    const {
      data = [],
      error: queryError,
      isLoading: queryLoading,
    } = useGetArticleRecommendationsListQuery(4);

    const articles =
      __PROJECT__ === 'storybook' && (storybookError || storybookLoading) ? [] : data;

    const error = __PROJECT__ === 'storybook' ? storybookError : queryError;

    const loading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;

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
          className={classes.recommendations}
          isLoading={loading}
          target='_blank'
          virtualized={false}
        />
      </VStack>
    );
  },
);

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList';
