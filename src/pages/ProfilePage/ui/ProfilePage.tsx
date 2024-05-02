import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { EditableProfileCard, getProfileData } from '@/features/EditableProfileCard';
import { ProfileRating } from '@/features/ProfileRating';

import { classNames } from '@/shared/lib/classNames/classNames';

import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { Page } from '@/widgets/Page';

import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Пробрасываемый 'ID' пользователя для 'storybook'
   */
  storybookProfileId?: string;
}

const ProfilePage = ({ className, storybookProfileId }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('profile');

  const currentUser = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);

  const profileId = __PROJECT__ === 'storybook' ? storybookProfileId : id;

  if (!profileId) {
    return (
      <Page className={classNames(classes.ProfilePage, {}, [className])} data-testid='ProfilePage'>
        <HStack justify='center'>
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<TextRedesigned title={t('Профиль не найден')} variant='error' />}
            off={<TextDeprecated theme={TextTheme.ERROR} title={t('Профиль не найден')} />}
          />
        </HStack>
      </Page>
    );
  }

  return (
    <Page className={classNames(classes.ProfilePage, {}, [className])} data-testid='ProfilePage'>
      <VStack gap='16'>
        <EditableProfileCard id={id} />

        {currentUser?.id !== profileId && <ProfileRating profileId={profileData?.id} />}
      </VStack>
    </Page>
  );
};

export default memo(ProfilePage);
