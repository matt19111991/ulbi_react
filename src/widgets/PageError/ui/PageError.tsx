import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button } from '@/shared/ui/redesigned/Button';

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
    <div className={classNames(classes.PageError, {}, [className])}>
      <p>{t('Произошла непредвиденная ошибка')}</p>

      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </div>
  );
});

PageError.displayName = 'PageError';
