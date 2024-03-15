import { memo } from 'react';
import type { FC, MouseEvent, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

/**
 * Убираем 'onClick' обработчик у 'SVG'-элемента: у нас клик происходит по 'button', а не по 'SVG'
 */
type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'SVG'-изображение
   */
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  /**
   * Иконка некликабельна (задаем только одно 'false' значение для типа, а не 'boolean'),
   * тем самым сужая тип в проверке 'if (clickable) { ... }'
   */
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  /**
   * Иконка кликабельна (задаем только одно 'true' значение для типа, а не 'boolean'),
   * тем самым сужая тип в проверке 'if (clickable) { ... }'
   */
  clickable?: true;

  /**
   * Обработчик клика на кнопку иконки
   */
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Иконка может быть кликабельной или некликабельной
 */
type IconProps = NonClickableIconProps | ClickableIconProps;

// Обёртка для 'SVG' (чтобы применялся цвет соответствующей темы к 'SVG')

export const Icon = memo((props: IconProps) => {
  /*
    деструктурируем только общие 'props', 'onClick' достаем через 'props.onClick' там,
    где типы сужаются, иначе ошибка в 'TS'
  */
  const { className, clickable, height = 32, Svg, width = 32, ...rest } = props;

  const icon = (
    <Svg
      {...rest}
      className={classNames(classes.Icon, {}, [className])}
      height={height}
      // иначе достается 'onClick()' из '...rest' и отрабатывает дважды для 'Icon' и 'button'
      onClick={undefined}
      width={width}
    />
  );

  if (clickable) {
    return (
      <button
        className={classes.button}
        onClick={props.onClick}
        style={{ height, width }}
        type='button'
      >
        {icon}
      </button>
    );
  }

  return icon;
});

Icon.displayName = 'Icon';
