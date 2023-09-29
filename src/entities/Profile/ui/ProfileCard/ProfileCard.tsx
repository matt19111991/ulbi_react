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
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Данные профиля
   */
  data?: Profile;

  /**
   * Ошибка
   */
  error?: string;

  /**
   * Состояние загрузки
   */
  isLoading?: boolean;

  /**
   * Обработчик изменения возраста
   */
  onChangeAge?: (value?: string) => void;

  /**
   * Обработчик изменения ссылки для аватара
   */
  onChangeAvatar?: (value?: string) => void;

  /**
   * Обработчик изменения города
   */
  onChangeCity?: (value?: string) => void;

  /**
   * Обработчик изменения страны
   */
  onChangeCountry?: (country: Country) => void;

  /**
   * Обработчик изменения валюты
   */
  onChangeCurrency?: (currency: Currency) => void;

  /**
   * Обработчик изменения имени пользователя
   */
  onChangeFirstName?: (value?: string) => void;

  /**
   * Обработчик изменения фамилии пользователя
   */
  onChangeLastName?: (value?: string) => void;

  /**
   * Обработчик изменения юзернейма пользователя
   */
  onChangeUserName?: (value?: string) => void;

  /**
   * Только для чтения
   */
  readOnly?: boolean;

  /**
   * Состояние загрузки, пробрасываемое из storybook
   */
  storybookLoading?: boolean;

  /**
   * Ошибка, пробрасываемая из storybook
   */
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
