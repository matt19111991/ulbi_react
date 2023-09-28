import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { useGetProfileRatingQuery, useRateProfileMutation } from '../../api/profileRatingApi';

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
  storybookLoading?: boolean;
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
    (starsCount: number, feedback?: string) => {
      try {
        rateProfileMutation({
          feedback,
          profileId,
          rate: starsCount,
          userId: userData?.id ?? '',
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e);
      }
    },
    [profileId, rateProfileMutation, userData?.id],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateProfile(starsCount, feedback);
    },
    [handleRateProfile],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateProfile(starsCount);
    },
    [handleRateProfile],
  );

  if (isLoading) {
    return <Skeleton height={120} width='100%' />;
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
