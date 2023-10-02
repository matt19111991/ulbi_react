import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';
import { useTranslation } from 'react-i18next';

import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  /**
   * Внешний класс
   */
  className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation();

  return (
    <Page
      className={classNames(classes.AdminPanelPage, {}, [className])}
      data-testid='AdminPanelPage'
    >
      {t('Страница администрирования')}
    </Page>
  );
};

export default memo(AdminPanelPage);
