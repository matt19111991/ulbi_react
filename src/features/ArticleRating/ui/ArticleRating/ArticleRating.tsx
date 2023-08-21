import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';

import { Skeleton } from '@/shared/ui/Skeleton';

import { useGetArticleRatingQuery, useRateArticleMutation } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  articleId: string;
  className?: string;
  storybookLoading?: boolean;
  storybookRatingEmpty?: boolean;
}

const ArticleRating = ({
  articleId,
  className,
  storybookLoading,
  storybookRatingEmpty,
}: ArticleRatingProps) => {
  const { t } = useTranslation();

  const userData  = useSelector(getUserAuthData);

  const {
    data,
    isLoading: queryLoading,
  } = useGetArticleRatingQuery({ articleId, userId: userData?.id ?? '' });

  const [rateArticleMutation] = useRateArticleMutation();

  const isLoading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;

  const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        articleId,
        feedback,
        rate: starsCount,
        userId: userData?.id ?? '',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('e', e);
    }
  }, [articleId, rateArticleMutation, userData?.id]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  }, [handleRateArticle]);

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount);
  }, [handleRateArticle]);

  if (isLoading) {
    return <Skeleton height={120} width='100%' />;
  }

  const rating = storybookRatingEmpty ? { rate: 0 } : data?.at(0);

  return (
    <RatingCard
      className={className}
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