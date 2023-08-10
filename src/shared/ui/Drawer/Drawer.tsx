import { ReactNode, useCallback, useEffect } from 'react';

import { useTheme } from '@/app/providers/ThemeProvider';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import {
  AnimationProvider,
  useAnimationLibraries,
} from '@/shared/lib/components/AnimationProvider';

import { useModal } from '@/shared/lib/hooks/useModal/useModal';

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

export const DrawerContent = ({
  children,
  className,
  isOpen,
  lazy,
  onClose,
}: DrawerProps) => {
  const { Gesture, Spring } = useAnimationLibraries();

  const { isMounted, onCloseModal } = useModal({ animationDelay: 300, isOpen, onClose });

  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

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
        ...Spring.config.stiff, // вид анимации: { tension: 210, friction: 20 }
        velocity: 0, // скорость ('0' по умолчанию)
      },
      onResolve: onClose, // по окончанию анимации вызываем 'onClose();'
      y: height,
    });
  };

  const bind = Gesture.useDrag(
    ({
      cancel,
      last,
      direction: [, dy],
      movement: [, my],
      velocity: [, vy],
    }) => {
      if (my < -70) { // смещение текущего жеста < -70
        cancel(); // отменяем закрытие 'drawer'
      }

      if (last) { // это последнее событие активного жеста
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) { // достаточное смещение для закрытия
          close(); // закрываем 'drawer' с анимацией
        } else {
          openDrawer(); // без этого 'drawer' повторно откроется со второго клика на 'trigger'
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

  if (!isOpen || (lazy && !isMounted)) {
    return null;
  }

  const mods: Mods = {
    [classes.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={
          classNames(classes.Drawer, mods, [className, theme])
        }
      >
        <Overlay onClick={onCloseModal} />

        <Spring.a.div // анимированный 'div'
          className={classes.sheet}
          style={{
            bottom: `calc(-100vh) + ${height - 100}px)`,

            // без 'display: none' 'drawer' задерживается внизу экрана при свайпе вниз
            display: y.to((py) => (py < height ? 'block' : 'none')),

            y, // без этого параметра анимация не работает
          }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
};

const DrawerAsync = ({ children, ...rest }: DrawerProps) => {
  const { isLoaded } = useAnimationLibraries();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...rest}>{children}</DrawerContent>;
};

export const Drawer = ({ children, ...rest }: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...rest}>{children}</DrawerAsync>
  </AnimationProvider>
);
