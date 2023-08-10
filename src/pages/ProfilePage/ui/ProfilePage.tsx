import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EditableProfileCard } from '@/features/EditableProfileCard';

import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';

import { Page } from '@/widgets/Page';

interface ProfilePageProps {
  className?: string;
  storybookUserId?: string;
}

const ProfilePage = ({ className, storybookUserId }: ProfilePageProps) => {
  const { id } = useParams<{ id: string; }>();
  const { t } = useTranslation('profile');

  const userId = __PROJECT__ === 'storybook' ? storybookUserId : id;

  if (!userId) {
    return (
      <Page className={classNames('', {}, [className])}>
        <HStack justify='center' max>
          <Text
            align={TextAlign.CENTER}
            theme={TextTheme.ERROR}
            title={t('Профиль не найден')}
          />
        </HStack>
      </Page>
    );
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap='16' max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default memo(ProfilePage);
