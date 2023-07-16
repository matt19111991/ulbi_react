import { memo } from 'react';

import { ArticleDetails } from 'entities/Article';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => (
  <div className={classNames('', {}, [className])}>
    <ArticleDetails />
  </div>
);

export default memo(ArticleDetailsPage);
