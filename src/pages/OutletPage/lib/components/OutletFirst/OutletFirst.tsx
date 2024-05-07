import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import classes from './OutletFirst.module.scss';

export const OutletFirst = memo(() => {
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<TextRedesigned className={classes.OutletFirst} title={t('Первый аутлет компонент')} />}
      off={<TextDeprecated className={classes.OutletFirst} title={t('Первый аутлет компонент')} />}
    />
  );
});

OutletFirst.displayName = 'OutletFirst';
