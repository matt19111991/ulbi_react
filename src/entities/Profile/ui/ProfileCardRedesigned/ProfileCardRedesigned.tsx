import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify='center' max>
      <Text
        align='center'
        text={t('Попробуйте обновить страницу')}
        title={t('Произошла ошибка при загрузке профиля')}
        variant='error'
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => (
  <Card max padding='24'>
    <VStack gap='32'>
      <HStack justify='center' max>
        <Skeleton border='100%' height={128} width={128} />
      </HStack>

      <HStack gap='32' max>
        <VStack gap='16' max>
          <Skeleton height={38} width='100%' />
          <Skeleton height={38} width='100%' />
          <Skeleton height={38} width='100%' />
          <Skeleton height={38} width='100%' />
        </VStack>

        <VStack gap='16' max>
          <Skeleton height={38} width='100%' />
          <Skeleton height={38} width='100%' />
          <Skeleton height={38} width='100%' />
          <Skeleton height={38} width='100%' />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

export const ProfileCardRedesigned = memo(
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

    if (storybookLoading) {
      return <ProfileCardRedesignedSkeleton />;
    }

    if (storybookError) {
      return <ProfileCardRedesignedError />;
    }

    return (
      <Card className={classNames('', {}, [className])} max padding='24'>
        <VStack gap='32'>
          {data?.avatar && (
            <HStack justify='center' max>
              <Avatar alt='avatar' size={128} src={data?.avatar} />
            </HStack>
          )}

          <HStack align='start' gap='24' max>
            <VStack gap='16' max>
              <Input
                data-testid='ProfileCard.firstName'
                fullWidth
                label={t('Имя')}
                onChange={onChangeFirstName}
                readOnly={readOnly}
                value={data?.first}
              />

              <Input
                data-testid='ProfileCard.lastName'
                fullWidth
                label={t('Фамилия')}
                onChange={onChangeLastName}
                readOnly={readOnly}
                value={data?.lastname}
              />

              <Input
                data-testid='ProfileCard.age'
                fullWidth
                label={t('Возраст')}
                onChange={onChangeAge}
                readOnly={readOnly}
                value={data?.age}
              />

              <Input
                data-testid='ProfileCard.city'
                fullWidth
                label={t('Город')}
                onChange={onChangeCity}
                readOnly={readOnly}
                value={data?.city}
              />
            </VStack>

            <VStack gap='16' max>
              <Input
                data-testid='ProfileCard.username'
                fullWidth
                label={t('Имя пользователя')}
                onChange={onChangeUserName}
                readOnly={readOnly}
                value={data?.username}
              />

              <Input
                data-testid='ProfileCard.avatar'
                fullWidth
                label={t('Ссылка на аватар')}
                onChange={onChangeAvatar}
                readOnly={readOnly}
                value={data?.avatar}
              />

              <CurrencySelect
                data-testid='ProfileCard.currency'
                direction='top-left'
                onChange={onChangeCurrency}
                readOnly={readOnly}
                value={data?.currency}
              />

              <CountrySelect
                data-testid='ProfileCard.country'
                direction='top-left'
                onChange={onChangeCountry}
                readOnly={readOnly}
                value={data?.country}
              />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  },
);

ProfileCardRedesigned.displayName = 'ProfileCardRedesigned';
