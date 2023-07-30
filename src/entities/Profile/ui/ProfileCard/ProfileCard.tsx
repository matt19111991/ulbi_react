import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { HStack, VStack } from 'shared/ui/Stack';
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
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
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
  onChangeCountry,
  onChangeCurrency,
  onChangeFirstName,
  onChangeLastName,
  onChangeUserName,
  readOnly,
}: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <HStack
        className={
          classNames(
            classes.ProfileCard,
            {},
            [className, classes.loading],
          )
        }
        justify='center'
        max
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        className={
          classNames(
            classes.ProfileCard,
            {},
            [className, classes.error],
          )
        }
        justify='center'
        max
      >
        <Text
          align={TextAlign.CENTER}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [classes.editing]: !readOnly,
  };

  return (
    <VStack
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
        onChange={onChangeFirstName}
        placeholder={t('Ваше имя')}
        readOnly={readOnly}
        value={data?.first}
      />

      <Input
        onChange={onChangeLastName}
        placeholder={t('Ваша фамилия')}
        readOnly={readOnly}
        value={data?.lastname}
      />

      <Input
        onChange={onChangeAge}
        placeholder={t('Ваш возраст')}
        readOnly={readOnly}
        value={data?.age}
      />

      <Input
        onChange={onChangeCity}
        placeholder={t('Выберите город')}
        readOnly={readOnly}
        value={data?.city}
      />

      <Input
        onChange={onChangeUserName}
        placeholder={t('Введите имя пользователя')}
        readOnly={readOnly}
        value={data?.username}
      />

      <Input
        fullWidth
        onChange={onChangeAvatar}
        placeholder={t('Введите ссылку на аватар')}
        readOnly={readOnly}
        value={data?.avatar}
      />

      <CurrencySelect
        onChange={onChangeCurrency}
        readOnly={readOnly}
        value={data?.currency}
      />

      <CountrySelect
        onChange={onChangeCountry}
        readOnly={readOnly}
        value={data?.country}
      />
    </VStack>
  );
});

ProfileCard.displayName = 'ProfileCard';
