import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button } from 'shared/ui/Button/Button';

import classes from './Code.module.scss';

interface CodeProps {
  children: ReactNode;
  className?: string;
}

export const Code = memo(({ children, className }: CodeProps) => {
  const { t } = useTranslation('article-details');

  return (
    // <pre> сохраняет все пробелы, переносы внутри текста
    <pre className={classNames(classes.Code, {}, [className])}>
      <Button className={classes.copyBtn}>{t('Копировать')}</Button>

      <code>{children}</code>
    </pre>
  );
});

Code.displayName = 'Code';
