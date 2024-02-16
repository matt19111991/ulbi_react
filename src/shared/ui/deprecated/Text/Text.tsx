import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Text.module.scss';

/**
 * Выравнивание текста
 */
export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * Размер текста
 */
export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

/**
 * Внешний вид текста
 */
export enum TextTheme {
  ERROR = 'error',
  INVERTED = 'inverted',
  PRIMARY = 'primary',
}

/**
 * Тип заголовка
 */
type HeaderTagType = 'h1' | 'h2' | 'h3';

/**
 * Классы для размера заголовков
 */
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

interface TextProps {
  /**
   * Выравнивание текста
   */
  align?: TextAlign;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' для тестов
   */
  'data-testid'?: string;

  /**
   * Размера текста
   */
  size?: TextSize;

  /**
   * Вторичный текст
   */
  text?: string;

  /**
   * Внешний вид текста
   */
  theme?: TextTheme;

  /**
   * Заголовок текста
   */
  title?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Text = memo(
  ({
    align = TextAlign.LEFT,
    className,
    'data-testid': dataTestId = 'Text',
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
