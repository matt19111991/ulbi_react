import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { Page } from '@/widgets/Page';

import classes from './SettingsPage.module.scss';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Page className={classes.SettingsPage}>
      <VStack align='start' className={classes.content} gap='24'>
        <Text title={t('Настройки пользователя')} />

        <UIDesignSwitcher />
      </VStack>
    </Page>
  );
};

export default memo(SettingsPage);
