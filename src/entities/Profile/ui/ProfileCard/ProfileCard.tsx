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
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeFirstName?: (value?: string) => void;
  onChangeLastName?: (value?: string) => void;
  onChangeUserName?: (value?: string) => void;
  readOnly?: boolean;
}

export const ProfileCard = memo(({
  className,
  data,
  isLoading,
  error,
  onChangeAge,
  onChangeAvatar,
  onChangeCity,
  onChangeFirstName,
  onChangeLastName,
  onChangeUserName,
  readOnly,
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
        {data?.avatar && <img src={data?.avatar} alt='avatar' />}

        <Input
          className={classes.input}
          onChange={onChangeFirstName}
          placeholder={t('Ваше имя')}
          readOnly={readOnly}
          value={data?.first}
        />

        <Input
          className={classes.input}
          onChange={onChangeLastName}
          placeholder={t('Ваша фамилия')}
          readOnly={readOnly}
          value={data?.lastname}
        />

        <Input
          className={classes.input}
          onChange={onChangeAge}
          placeholder={t('Ваш возраст')}
          readOnly={readOnly}
          value={data?.age}
        />

        <Input
          className={classes.input}
          onChange={onChangeCity}
          placeholder={t('Выберите город')}
          readOnly={readOnly}
          value={data?.city}
        />

        <Input
          className={classes.input}
          onChange={onChangeUserName}
          placeholder={t('Введите имя пользователя')}
          readOnly={readOnly}
          value={data?.username}
        />

        <Input
          className={classes.input}
          onChange={onChangeAvatar}
          placeholder={t('Введите ссылку на аватар')}
          readOnly={readOnly}
          value={data?.avatar}
        />
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';
