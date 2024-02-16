import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Text.module.scss';

/**
 * Выравнивание текста
 */
export type TextAlign = 'center' | 'left' | 'right';

/**
 * Размер текста
 */
export type TextSize = 's' | 'm' | 'l';

/**
 * Внешний вид текста
 */
export type TextVariant = 'accent' | 'error' | 'primary';

/**
 * Тип заголовка
 */
type HeaderTagType = 'h1' | 'h2' | 'h3';

/**
 * Классы для размера текста
 */
const mapSizeToClass: Record<TextSize, string> = {
  s: classes.size_s,
  m: classes.size_m,
  l: classes.size_l,
};

/**
 * Классы для размера заголовков
 */
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

interface TextProps {
  /**
   * Выравнивание текста
   */
  align?: TextAlign;

  /**
   * Толщина текста
   */
  bold?: boolean;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' для тестов
   */
  'data-testid'?: string;

  /**
   * Размер текста
   */
  size?: TextSize;

  /**
   * Вторичный текст
   */
  text?: string;

  /**
   * Заголовок текста
   */
  title?: string;

  /**
   * Внешний вид текста
   */
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
