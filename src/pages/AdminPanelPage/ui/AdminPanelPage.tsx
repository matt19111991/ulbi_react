import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Counter } from '@/entities/Counter';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';

import { VStack } from '@/shared/ui/redesigned/Stack';

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
      <VStack align='start' gap='24'>
        {t('Страница администрирования')}

        <Counter />
      </VStack>
    </Page>
  );
};

export default memo(AdminPanelPage);
