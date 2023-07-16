import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleTextBlockComponentProps {
  className?: string;
}

export const ArticleTextBlockComponent = memo(({
  className,
}: ArticleTextBlockComponentProps) => (
  // eslint-disable-next-line i18next/no-literal-string
  <div className={classNames('', {}, [className])}>
    ArticleTextBlockComponent
  </div>
));

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';
