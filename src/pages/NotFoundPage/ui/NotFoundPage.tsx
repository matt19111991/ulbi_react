import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/entities/Page';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(classes.NotFoundPage, {}, [className])} data-testid='NotFoundPage'>
      {t('Страница не найдена')}
    </Page>
  );
});

NotFoundPage.displayName = 'NotFoundPage';
