import { memo, useCallback } from 'react';

import CopyIconDeprecated from '@/shared/assets/icons/copy-22-22.svg';
import CopyIconRedesigned from '@/shared/assets/icons/copy-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '../../deprecated/Button';

import { Icon as IconRedesigned } from '../Icon';

import classes from './Code.module.scss';

interface CodeProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Содержимое
   */
  text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  // <pre> сохраняет все пробелы, переносы внутри текста

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <pre className={classNames(classes.CodeRedesigned, {}, [className])}>
          <IconRedesigned
            clickable
            className={classes.copyBtn}
            onClick={onCopy}
            Svg={CopyIconRedesigned}
          />

          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(classes.Code, {}, [className])}>
          <ButtonDeprecated className={classes.copyBtn} onClick={onCopy} theme={ButtonTheme.CLEAR}>
            <CopyIconDeprecated className={classes.copyIcon} />
          </ButtonDeprecated>

          <code>{text}</code>
        </pre>
      }
    />
  );
});

Code.displayName = 'Code';
