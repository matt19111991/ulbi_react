import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { Article } from '@/entities/Article';

import { RatingCard } from '@/entities/Rating';
import type { Rating } from '@/entities/Rating';

import { getUserAuthData } from '@/entities/User';

import { ToggleFeatures } from '@/shared/lib/features';

import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import { useGetArticleRatingQuery, useRateArticleMutation } from '../../api/articleRatingApi';
import type { GetArticleRatingArgs, RateArticleArgs } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  /**
   * 'ID' статьи
   */
  articleId?: Article['id'];

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Пробрасываемое состояние загрузки из 'storybook'
   */
  storybookLoading?: boolean;

  /**
   * Пробрасываемое пустое значение рейтинга из 'storybook'
   */
  storybookRatingEmpty?: boolean;
}

const ArticleRating = ({
  articleId,
  className,
  storybookLoading,
  storybookRatingEmpty,
}: ArticleRatingProps) => {
  const { t } = useTranslation();

  const userData = useSelector(getUserAuthData);

  const getArticleRatingArgs: GetArticleRatingArgs = {
    articleId: articleId ?? '',
    userId: userData?.id ?? '',
  };

  const getArticleRatingOptions = {
    /*
      при каждом посещении страницы со статьей отправляем запрос на получение рейтинга,
      иначе запрос кэшируется и используется старое значение
    */
    refetchOnMountOrArgChange: true,
  };

  const { data, isLoading: queryLoading } = useGetArticleRatingQuery(
    getArticleRatingArgs,
    getArticleRatingOptions,
  );

  const [rateArticleMutation] = useRateArticleMutation();

  const isLoading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;

  const handleRateArticle = useCallback(
    (starsCount: Rating['rate'], feedback?: Rating['feedback']) => {
      try {
        if (articleId) {
          const rateArticleArgs: RateArticleArgs = {
            articleId,
            feedback,
            rate: starsCount,
            userId: userData?.id ?? '',
          };

          rateArticleMutation(rateArticleArgs);
        }
      } catch (e) {
        console.log(`Article rating error: ${(e as Error).message}`);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onAccept = useCallback(
    (starsCount: Rating['rate'], feedback?: Rating['feedback']) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  const onCancel = useCallback(
    (starsCount: Rating['rate']) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<SkeletonRedesigned height={120} width='100%' />}
        off={<SkeletonDeprecated height={120} width='100%' />}
      />
    );
  }

  if (!articleId) {
    return null;
  }

  const rating = storybookRatingEmpty ? { rate: 0 } : data?.[0];

  return (
    <RatingCard
      className={className}
      data-testid='ArticleRating'
      feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
      hasFeedback
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={t('Оцените статью')}
    />
  );
};

export default memo(ArticleRating);
