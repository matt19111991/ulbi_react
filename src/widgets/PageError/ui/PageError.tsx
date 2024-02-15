import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import classes from './PageError.module.scss';

interface PageErrorProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const PageError = memo(({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <div className={classNames(classes.PageError, {}, [className, classes.redesigned])}>
          <TextRedesigned text={t('Произошла непредвиденная ошибка')} size='l' variant='error' />

          <ButtonRedesigned color='error' onClick={reloadPage} variant='outline'>
            {t('Обновить страницу')}
          </ButtonRedesigned>
        </div>
      }
      off={
        <div className={classNames(classes.PageError, {}, [className, classes.deprecated])}>
          <TextDeprecated
            size={TextSize.L}
            text={t('Произошла непредвиденная ошибка')}
            theme={TextTheme.ERROR}
          />

          <ButtonDeprecated onClick={reloadPage} theme={ButtonTheme.OUTLINE_RED}>
            {t('Обновить страницу')}
          </ButtonDeprecated>
        </div>
      }
    />
  );
});

PageError.displayName = 'PageError';
