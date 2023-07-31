import { memo } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Text.module.scss';

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

export enum TextTheme {
  ERROR = 'error',
  INVERTED = 'inverted',
  PRIMARY = 'primary',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

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
  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: Mods = {
    [classes[align]]: true,
    [classes[size]]: true,
    [classes[theme]]: true,
  };

  return (
    <div className={classNames('', mods, [className])}>
      {title && <HeaderTag className={classes.title}>{title}</HeaderTag>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});

Text.displayName = 'Text';
