import { memo, useCallback } from 'react';

import CopyIcon from 'shared/assets/icons/copy-22-22.svg';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from '../Button/Button';

import classes from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    // <pre> сохраняет все пробелы, переносы внутри текста
    <pre className={classNames(classes.Code, {}, [className])}>
      <Button className={classes.copyBtn} onClick={onCopy} theme={ButtonTheme.CLEAR}>
        <CopyIcon className={classes.copyIcon} />
      </Button>

      <code>{text}</code>
    </pre>
  );
});

Code.displayName = 'Code';
