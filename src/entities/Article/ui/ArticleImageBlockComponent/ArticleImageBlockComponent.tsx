import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleImageBlockComponentProps {
  className?: string;
}

export const ArticleImageBlockComponent = memo(({
  className,
}: ArticleImageBlockComponentProps) => (
  // eslint-disable-next-line i18next/no-literal-string
  <div className={classNames('', {}, [className])}>
    ArticleImageBlockComponent
  </div>
));

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
