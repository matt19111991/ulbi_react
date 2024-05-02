import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { EditableProfileCard, getProfileData } from '@/features/EditableProfileCard';
import { ProfileRating } from '@/features/ProfileRating';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { Page } from '@/widgets/Page';

import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Пробрасываемый ID пользователя для storybook
   */
  storybookUserId?: string;
}

const ProfilePage = ({ className, storybookUserId }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('profile');

  const currentUser = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);

  const userId = __PROJECT__ === 'storybook' ? storybookUserId : id;

  if (!userId) {
    return (
      <Page className={classNames('', {}, [className])}>
        <HStack justify='center' max>
          <Text align={TextAlign.CENTER} theme={TextTheme.ERROR} title={t('Профиль не найден')} />
        </HStack>
      </Page>
    );
  }

  return (
    <Page className={classNames(classes.ProfilePage, {}, [className])} data-testid='ProfilePage'>
      <VStack gap='16' max>
        <EditableProfileCard id={id} />

        {currentUser?.id !== userId && <ProfileRating profileId={profileData?.id} />}
      </VStack>
    </Page>
  );
};

export default memo(ProfilePage);
