import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => (
  <Page
    className={classNames('', {}, [className])}
    /* eslint-disable-next-line i18next/no-literal-string */
  >
    Admin panel page
  </Page>
);

export default memo(AdminPanelPage);
