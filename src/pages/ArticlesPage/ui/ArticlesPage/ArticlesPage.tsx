import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => (
  // eslint-disable-next-line i18next/no-literal-string
  <div className={classNames('', {}, [className])}>
    Articles Page
  </div>
);

export default memo(ArticlesPage);
