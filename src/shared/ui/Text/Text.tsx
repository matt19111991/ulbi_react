import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Text.module.scss';

export enum TextTheme {
  ERROR = 'error',
  PRIMARY = 'primary',
}

interface TextProps {
  className?: string;
  text?: string;
  theme?: TextTheme;
  title?: string;
}

export const Text = memo(({
  className,
  text,
  theme = TextTheme.PRIMARY,
  title,
}: TextProps) => (
  <div
    className={
      classNames(
        '',
        { [classes[theme]]: true },
        [className],
      )
    }
  >
    {title && <p className={classes.title}>{title}</p>}
    {text && <p className={classes.text}>{text}</p>}
  </div>
));

Text.displayName = 'Text';
