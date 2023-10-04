import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/entities/Page';

import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <VStack align='start' gap='24'>
        <Text title={t('Настройки пользователя')} />

        <UIDesignSwitcher />
      </VStack>
    </Page>
  );
};

export default memo(SettingsPage);
