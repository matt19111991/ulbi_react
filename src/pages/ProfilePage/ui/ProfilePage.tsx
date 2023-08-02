import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EditableProfileCard } from 'features/EditableProfileCard';

import { classNames } from 'shared/lib/classNames/classNames';

import { VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import { Page } from 'widgets/Page';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string; }>();
  const { t } = useTranslation('profile');

  if (!id) {
    return (
      <Page className={classNames('', {}, [className])}>
        <VStack gap='16' max>
          <Text
            align={TextAlign.CENTER}
            theme={TextTheme.ERROR}
            title={t('Профиль не найден')}
          />
        </VStack>
      </Page>
    );
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap='16' max>
        <EditableProfileCard id={id!} />
      </VStack>
    </Page>
  );
};

export default memo(ProfilePage);
