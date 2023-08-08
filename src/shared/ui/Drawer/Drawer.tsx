import { ReactNode, useCallback, useEffect } from 'react';
import { a, config, useSpring } from '@react-spring/web'; // библиотека для анимаций
import { useDrag } from '@use-gesture/react'; // библиотека для свайпов, тача, drag'n'drop

import { useTheme } from 'app/providers/ThemeProvider';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Drawer.module.scss';

interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100; // общая высота окна - 100px

export const Drawer = ({
  children,
  className,
  isOpen,
  lazy,
  onClose,
}: DrawerProps) => {
  const { isMounted, onCloseModal } = useModal({ animationDelay: 300, isOpen, onClose });

  const [{ y }, api] = useSpring(() => ({ y: height }));

  const { theme } = useTheme();

  const openDrawer = useCallback(() => {
    api.start({ y: 0 }); // запускаем анимацию при открытии 'drawer'
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [isOpen, openDrawer]);

  const close = () => {
    api.start({ // запускаем анимацию при закрытии 'drawer'
      config: {
        ...config.stiff, // вид анимации: { tension: 210, friction: 20 }
        velocity: 0, // скорость (0 по умолчанию)
      },
      onResolve: onClose, // по окончанию анимации вызываем 'onClose();'
      y: height,
    });
  };

  const bind = useDrag(
    ({
      cancel,
      last,
      direction: [, dy],
      movement: [, my],
      velocity: [, vy],
    }) => {
      if (my < -70) { // смещение текущего жеста < -70
        cancel(); // отменяем перетаскивание
      }

      if (last) { // это последнее событие активного жеста
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) { // достаточное смещение для закрытия
          close(); // закрываем 'drawer'
        } else {
          openDrawer(); // без этого повторно не откроется 'drawer'
        }
      } else { // это не последнее событие активного жеста
        api.start({ y: my, immediate: true }); // без анимации выставляем 'y'
      }
    },
    {
        bounds: { top: 0 }, // границы смещения жеста, может быть 'ref' или DOM узлом
        from: () => [0, y.get()], // смещение положения начнется с этого значения
        filterTaps: true, // перетаскивания не будет, если пользователь только что щелкнул компонент
        rubberband: true, // коэффициент эластичности жеста при выходе за пределы (при 'true' === 0,15)
      },
  );

  if (!isOpen) {
    return null;
  }

  const mods: Mods = {
    [classes.opened]: isOpen,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={
          classNames(classes.Drawer, mods, [className, theme])
        }
      >
        <Overlay onClick={onCloseModal} />

        <a.div // анимированный 'div'
          className={classes.sheet}
          style={{
            bottom: `calc(-100vh) + ${height - 100}px)`,
            display: y.to((py) => (py < height ? 'block' : 'none')),
            y,
          }}
          {...bind()}
        >
          {children}
        </a.div>
      </div>
    </Portal>
  );
};
