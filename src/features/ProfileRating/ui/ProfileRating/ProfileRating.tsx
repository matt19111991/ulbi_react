import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { Rating } from '@/entities/Rating';
import { RatingCard } from '@/entities/Rating';

import { getUserAuthData } from '@/entities/User';

import { ToggleFeatures } from '@/shared/lib/features';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { useGetProfileRatingQuery, useRateProfileMutation } from '../../api/profileRatingApi';

export interface ProfileRatingProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' профиля
   */
  profileId?: string;

  /**
   * Пробрасываемое состояние загрузки из 'storybook'
   */
  storybookLoading?: boolean;

  /**
   * Пробрасываемое пустое значение рейтинга из 'storybook'
   */
  storybookRatingEmpty?: boolean;
}

const ProfileRating = ({
  className,
  profileId,
  storybookLoading,
  storybookRatingEmpty,
}: ProfileRatingProps) => {
  const { t } = useTranslation();

  const userData = useSelector(getUserAuthData);

  const { data, isLoading: queryLoading } = useGetProfileRatingQuery({
    profileId,
    userId: userData?.id ?? '',
  });

  const [rateProfileMutation] = useRateProfileMutation();

  const isLoading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;

  const handleRateProfile = useCallback(
    (starsCount: Rating['rate'], feedback?: Rating['feedback']) => {
      try {
        rateProfileMutation({
          feedback,
          profileId,
          rate: starsCount,
          userId: userData?.id ?? '',
        });
      } catch (e) {
        console.log(`Profile rating error: ${(e as Error).message}`);
      }
    },
    [profileId, rateProfileMutation, userData?.id],
  );

  const onAccept = useCallback(
    (starsCount: Rating['rate'], feedback?: Rating['feedback']) => {
      handleRateProfile(starsCount, feedback);
    },
    [handleRateProfile],
  );

  const onCancel = useCallback(
    (starsCount: Rating['rate']) => {
      handleRateProfile(starsCount);
    },
    [handleRateProfile],
  );

  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Skeleton border='4px' height={143} />}
        off={null}
      />
    );
  }

  if (!profileId) {
    return null;
  }

  const rating = storybookRatingEmpty ? { rate: 0 } : data?.at(0);

  return (
    <RatingCard
      className={className}
      data-testid='ProfileRating'
      feedbackTitle={t('Оставьте свой отзыв о профиле, это поможет улучшить качество')}
      hasFeedback
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={t('Оцените профиль')}
    />
  );
};

export default memo(ProfileRating);
