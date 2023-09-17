import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import classes from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack className={classNames('', {}, [classes.error])} justify='center' max>
      <Text
        align={TextAlign.CENTER}
        text={t('Попробуйте обновить страницу')}
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке профиля')}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedSkeleton = () => (
  <HStack className={classNames('', {}, [classes.loading])} justify='center' max>
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = memo(
  ({
    className,
    data,
    onChangeAge,
    onChangeAvatar,
    onChangeCity,
    onChangeCountry,
    onChangeCurrency,
    onChangeFirstName,
    onChangeLastName,
    onChangeUserName,
    readOnly,
    storybookLoading,
    storybookError,
  }: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const mods: Mods = {
      [classes.editing]: !readOnly,
    };

    if (storybookLoading) {
      return <ProfileCardDeprecatedSkeleton />;
    }

    if (storybookError) {
      return <ProfileCardDeprecatedError />;
    }

    return (
      <VStack
        align='start'
        className={classNames(classes.ProfileCard, mods, [className])}
        gap='8'
        max
      >
        {data?.avatar && (
          <HStack justify='center' max>
            <Avatar alt='avatar' src={data?.avatar} />
          </HStack>
        )}

        <Input
          className={classes.fullWidth}
          data-testid='ProfileCard.firstName'
          onChange={onChangeFirstName}
          placeholder={t('Имя')}
          readOnly={readOnly}
          value={data?.first}
        />

        <Input
          className={classes.fullWidth}
          data-testid='ProfileCard.lastName'
          onChange={onChangeLastName}
          placeholder={t('Фамилия')}
          readOnly={readOnly}
          value={data?.lastname}
        />

        <Input
          className={classes.fullWidth}
          data-testid='ProfileCard.age'
          onChange={onChangeAge}
          placeholder={t('Возраст')}
          readOnly={readOnly}
          value={data?.age}
        />

        <Input
          className={classes.fullWidth}
          data-testid='ProfileCard.city'
          onChange={onChangeCity}
          placeholder={t('Город')}
          readOnly={readOnly}
          value={data?.city}
        />

        <Input
          className={classes.fullWidth}
          data-testid='ProfileCard.username'
          onChange={onChangeUserName}
          placeholder={t('Имя пользователя')}
          readOnly={readOnly}
          value={data?.username}
        />

        <Input
          className={classes.fullWidth}
          data-testid='ProfileCard.avatar'
          fullWidth
          onChange={onChangeAvatar}
          placeholder={t('Ссылка на аватар')}
          readOnly={readOnly}
          value={data?.avatar}
        />

        <CurrencySelect
          className={classes.fullWidth}
          data-testid='ProfileCard.currency'
          direction='top-left'
          onChange={onChangeCurrency}
          readOnly={readOnly}
          value={data?.currency}
        />

        <CountrySelect
          className={classes.fullWidth}
          data-testid='ProfileCard.country'
          direction='top-left'
          onChange={onChangeCountry}
          readOnly={readOnly}
          value={data?.country}
        />
      </VStack>
    );
  },
);

ProfileCardDeprecated.displayName = 'ProfileCardDeprecated';
