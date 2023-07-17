import { memo } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Text.module.scss';

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

export enum TextTheme {
  ERROR = 'error',
  PRIMARY = 'primary',
}

interface TextProps {
  align?: TextAlign;
  className?: string;
  size?: TextSize;
  text?: string;
  theme?: TextTheme;
  title?: string;
}

export const Text = memo(({
  align = TextAlign.LEFT,
  className,
  size = TextSize.M,
  text,
  theme = TextTheme.PRIMARY,
  title,
}: TextProps) => {
  const mods: Mods = {
    [classes[align]]: true,
    [classes[size]]: true,
    [classes[theme]]: true,
  };

  return (
    <div className={classNames('', mods, [className])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});

Text.displayName = 'Text';
