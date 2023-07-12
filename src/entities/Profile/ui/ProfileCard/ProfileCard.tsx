import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import { Profile } from '../../model/types/Profile';

import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeFirstName?: (value?: string) => void;
  onChangeLastName?: (value?: string) => void;
}

export const ProfileCard = memo(({
  className,
  data,
  isLoading,
  error,
  onChangeFirstName,
  onChangeLastName,
}: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <div className={classNames(classes.ProfileCard, {}, [className, classes.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(classes.ProfileCard, {}, [className, classes.error])}>
        <Text
          align={TextAlign.CENTER}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
        />
      </div>
    );
  }

  return (
    <div className={classNames(classes.ProfileCard, {}, [className])}>
      <div className={classes.data}>
        <Input
          className={classes.input}
          onChange={onChangeFirstName}
          placeholder={t('Ваше имя')}
          value={data?.first}
        />

        <Input
          className={classes.input}
          onChange={onChangeLastName}
          placeholder={t('Ваша фамилия')}
          value={data?.lastname}
        />
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';
