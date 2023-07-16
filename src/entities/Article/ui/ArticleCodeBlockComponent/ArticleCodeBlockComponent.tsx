import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleCodeBlockComponentProps {
  className?: string;
}

export const ArticleCodeBlockComponent = memo(({
  className,
}: ArticleCodeBlockComponentProps) => (
  // eslint-disable-next-line i18next/no-literal-string
  <div className={classNames('', {}, [className])}>
    ArticleCodeBlockComponent
  </div>
));

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
