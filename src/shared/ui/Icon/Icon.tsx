import { memo, SVGProps, VFC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: VFC<SVGProps<SVGSVGElement>>;
}

// Обёртка для SVG (чтобы применялся цвет соответствующей темы к SVG)

export const Icon = memo(({ className, Svg }: IconProps) => (
  <Svg className={classNames(classes.Icon, {}, [className])} />
));

Icon.displayName = 'Icon';
