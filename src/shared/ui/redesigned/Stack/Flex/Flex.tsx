import { memo } from 'react';
import type { DetailedHTMLProps, ForwardedRef, HTMLAttributes, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Flex.module.scss';

/**
 * 'Flex align'
 */
export type FlexAlign = 'start' | 'center' | 'end';

/**
 * 'Flex direction'
 */
export type FlexDirection = 'column' | 'row';

/**
 * 'Flex gap'
 */
export type FlexGap = '4' | '8' | '16' | '24' | '32';

/**
 * 'Flex justify'
 */
export type FlexJustify = 'start' | 'center' | 'end' | 'between';

/**
 * 'Flex wrap'
 */
export type FlexWrap = 'nowrap' | 'wrap';

/**
 * Классы для 'flex align'
 */
const alignClasses: Record<FlexAlign, string> = {
  start: classes.alignStart,
  center: classes.alignCenter,
  end: classes.alignEnd,
};

/**
 * Классы для 'flex direction'
 */
const directionClasses: Record<FlexDirection, string> = {
  column: classes.directionColumn,
  row: classes.directionRow,
};

/**
 * Классы для 'flex gap'
 */
const gapClasses: Record<FlexGap, string> = {
  4: classes.gap4,
  8: classes.gap8,
  16: classes.gap16,
  24: classes.gap24,
  32: classes.gap32,
};

/**
 * Классы для 'flex justify'
 */
const justifyClasses: Record<FlexJustify, string> = {
  start: classes.justifyStart,
  center: classes.justifyCenter,
  end: classes.justifyEnd,
  between: classes.justifyBetween,
};

// взято из интернета
type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

// в 'HStack' и 'VStack' можно использовать нативные атрибуты от 'div' ('role' и т.д.)
export interface FlexProps extends DivProps {
  /**
   * 'Flex align'
   */
  align?: FlexAlign;

  /**
   * Содержимое
   */
  children: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'Flex direction'
   */
  direction: FlexDirection;

  /**
   * 'Flex gap'
   */
  gap?: FlexGap;

  /**
   * 'Flex justify'
   */
  justify?: FlexJustify;

  /**
   * Растянуть на максимально доступную ширину
   */
  max?: boolean;

  /**
   * Прокинутая ссылка на элемент
   */
  ref?: ForwardedRef<HTMLDivElement | null>;

  /**
   * 'Flex wrap'
   */
  wrap?: FlexWrap;
}

export const Flex = memo(
  ({
    align = 'center',
    className,
    children,
    direction = 'row',
    gap,
    justify = 'start',
    max,
    wrap = 'nowrap',
    ...rest
  }: FlexProps) => {
    const additionalClasses = [
      className,
      classes[wrap],
      alignClasses[align],
      directionClasses[direction],
      gap && gapClasses[gap],
      justifyClasses[justify],
    ];

    const mods: Mods = {
      [classes.max]: max,
    };

    return (
      <div className={classNames(classes.Flex, mods, additionalClasses)} {...rest}>
        {children}
      </div>
    );
  },
);

Flex.displayName = 'Flex';
