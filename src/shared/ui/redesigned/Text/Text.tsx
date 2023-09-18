import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Text.module.scss';

export type TextAlign = 'center' | 'left' | 'right';

export type TextSize = 's' | 'm' | 'l';

export type TextVariant = 'accent' | 'error' | 'primary';

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

interface TextProps {
  align?: TextAlign;
  bold?: boolean;
  className?: string;
  'data-testid'?: string;
  size?: TextSize;
  text?: string;
  title?: string;
  variant?: TextVariant;
}

export const Text = memo(
  ({
    align = 'left',
    bold,
    className,
    'data-testid': dataTestId = 'Text',
    size = 'm',
    text,
    title,
    variant = 'primary',
  }: TextProps) => {
    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [className, classes[align], classes[variant], sizeClass];

    return (
      <div className={classNames('', { [classes.bold]: bold }, additionalClasses)}>
        {title && (
          <HeaderTag className={classes.title} data-testid={`${dataTestId}.Header`}>
            {title}
          </HeaderTag>
        )}

        {text && (
          <p className={classes.text} data-testid={`${dataTestId}.Paragraph`}>
            {text}
          </p>
        )}
      </div>
    );
  },
);

Text.displayName = 'Text';
