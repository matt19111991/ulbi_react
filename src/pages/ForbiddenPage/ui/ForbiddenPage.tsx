import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';

import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();

  return (
    <Page
      className={classNames(classes.ForbiddenPage, {}, [className])}
      data-testid='ForbiddenPage'
    >
      {t('У вас нет доступа к этой странице')}
    </Page>
  );
});

ForbiddenPage.displayName = 'ForbiddenPage';
