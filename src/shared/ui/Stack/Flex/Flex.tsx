import {
  DetailedHTMLProps,
  HTMLAttributes,
  memo,
  ReactNode,
} from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Flex.module.scss';

export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'column' | 'row';
export type FlexGap = '4' | '8' | '16' | '32';
export type FlexJustify = 'start' | 'center' | 'end' | 'between';

const alignClasses: Record<FlexAlign, string> = {
  start: classes.alignStart,
  center: classes.alignCenter,
  end: classes.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  column: classes.directionColumn,
  row: classes.directionRow,
};

const gapClasses: Record<FlexGap, string> = {
  4: classes.gap4,
  8: classes.gap8,
  16: classes.gap16,
  32: classes.gap32,
};

const justifyClasses: Record<FlexJustify, string> = {
  start: classes.justifyStart,
  center: classes.justifyCenter,
  end: classes.justifyEnd,
  between: classes.justifyBetween,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

// в 'HStack' и 'VStack' можно использовать нативные атрибуты от 'div' ('role' и т.д.)
export interface FlexProps extends DivProps {
  align?: FlexAlign;
  children: ReactNode;
  className?: string;
  direction: FlexDirection;
  gap?: FlexGap;
  justify?: FlexJustify;
  max?: boolean;
}

export const Flex = memo(({
  align = 'center',
  className,
  children,
  direction = 'row',
  gap,
  justify = 'start',
  max,
}: FlexProps) => {
  const additionalClasses = [
    className,
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    justifyClasses[justify],
  ];

  const mods: Mods = {
    [classes.max]: max,
  };

  return (
    <div className={classNames(classes.Flex, mods, additionalClasses)}>
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';
