import { memo } from 'react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ToggleFeatures } from '@/shared/lib/features';

import { Profile } from '../../model/types/profile';

import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedSkeleton,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';

import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeFirstName?: (value?: string) => void;
  onChangeLastName?: (value?: string) => void;
  onChangeUserName?: (value?: string) => void;
  readOnly?: boolean;
  storybookLoading?: boolean;
  storybookError?: boolean;
}

export const ProfileCard = memo(({ className, isLoading, error, ...rest }: ProfileCardProps) => {
  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileCardRedesignedSkeleton />}
        off={<ProfileCardDeprecatedSkeleton />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ProfileCardRedesigned className={className} {...rest} />}
      off={<ProfileCardDeprecated className={className} {...rest} />}
    />
  );
});

ProfileCard.displayName = 'ProfileCard';
