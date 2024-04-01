import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';

import { Page } from '@/widgets/Page';

import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  /**
   * Внешний класс
   */
  className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation();

  const pageClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => classes.redesigned,
    off: () => classes.deprecated,
  });

  return (
    <Page
      className={classNames(classes.AdminPanelPage, {}, [className, pageClass])}
      data-testid='AdminPanelPage'
    >
      {t('Страница администрирования')}
    </Page>
  );
};

export default memo(AdminPanelPage);
