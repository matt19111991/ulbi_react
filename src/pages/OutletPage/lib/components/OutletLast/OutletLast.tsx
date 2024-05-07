import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import classes from './OutletLast.module.scss';

export const OutletLast = memo(() => {
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<TextRedesigned className={classes.OutletLast} title={t('Последний аутлет компонент')} />}
      off={
        <TextDeprecated className={classes.OutletLast} title={t('Последний аутлет компонент')} />
      }
    />
  );
});

OutletLast.displayName = 'OutletLast';
