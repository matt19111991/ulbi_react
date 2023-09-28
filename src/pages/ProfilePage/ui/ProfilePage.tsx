import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileRating } from '@/features/ProfileRating';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { Page } from '@/widgets/Page';

interface ProfilePageProps {
  className?: string;
  storybookUserId?: string;
}

const ProfilePage = ({ className, storybookUserId }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('profile');

  const currentUser = useSelector(getUserAuthData);

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
    <Page className={classNames('', {}, [className])} data-testid='ProfilePage'>
      <VStack gap='16' max>
        <EditableProfileCard id={id} />

        {currentUser?.id !== userId && <ProfileRating profileId={userId} />}
      </VStack>
    </Page>
  );
};

export default memo(ProfilePage);
