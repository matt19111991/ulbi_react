import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { Page } from '@/widgets/Page';

import classes from './SettingsPage.module.scss';

const SettingsPage = () => {
  const { t } = useTranslation();

  const user = useSelector(getUserAuthData);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Page
          className={classNames(classes.SettingsPage, { [classes.authorized]: Boolean(user) }, [
            classes.redesigned,
          ])}
        >
          <VStack align='start' className={classes.content} gap='24'>
            <TextRedesigned title={t('Настройки пользователя')} />

            <UIDesignSwitcher />
          </VStack>
        </Page>
      }
      off={
        <Page
          className={classNames(classes.SettingsPage, { [classes.authorized]: Boolean(user) }, [
            classes.deprecated,
          ])}
        >
          <VStack align='start' className={classes.content} gap='24'>
            <TextDeprecated title={t('Настройки пользователя')} />

            <UIDesignSwitcher />
          </VStack>
        </Page>
      }
    />
  );
};

export default memo(SettingsPage);
