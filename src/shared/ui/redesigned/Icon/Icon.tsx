import { FC, memo, MouseEvent, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

/**
 * Убираем 'onClick' обработчик у SVG элемента
 */
type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Наследуем класс от родителя (для подсветки при наведении на ссылку и названия и иконки)
   */
  inheritParentClassName?: boolean;

  /**
   * SVG изображение
   */
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  /**
   * Иконка некликабельна
   */
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  /**
   * Иконка кликабельна
   */
  clickable?: true;

  /**
   * Обработчик клика на иконку
   */
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Иконка может быть кликабельной или некликабельной
 */
type IconsProps = NonClickableIconProps | ClickableIconProps;

// Обёртка для SVG (чтобы применялся цвет соответствующей темы к SVG)

export const Icon = memo(
  ({
    className,
    clickable,
    height = 32,
    inheritParentClassName,
    onClick,
    Svg,
    width = 32,
    ...rest
  }: IconsProps & { onClick?: ClickableIconProps['onClick'] }) => {
    const icon = (
      <Svg
        {...rest}
        className={classNames('', { [classes.Icon]: !inheritParentClassName }, [className])}
        height={height}
        // иначе достается' onClick' из '...rest' и отрабатывает дважды для 'Icon' и 'button'
        onClick={undefined}
        width={width}
      />
    );

    if (clickable) {
      return (
        <button
          className={classes.button}
          onClick={onClick}
          style={{ height, width }}
          type='button'
        >
          {icon}
        </button>
      );
    }

    return icon;
  },
);

Icon.displayName = 'Icon';
