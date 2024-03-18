import { useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import { toggleFeatures } from '@/shared/lib/features';

import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { AnimationProvider, useAnimationLibraries } from '@/shared/lib/providers/AnimationProvider';

import { Overlay } from '../Overlay';
import { Portal } from '../Portal';

import classes from './Drawer.module.scss';

interface DrawerProps {
  /**
   * Содержимое
   */
  children: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Состояние ('Drawer' закрыт или открыт)
   */
  isOpen?: boolean;

  /**
   * Должен компонент лениво загружаться?
   */
  lazy?: boolean;

  /**
   * Колбэк при закрытии 'Drawera'
   */
  onClose?: () => void;
}

/**
 * Общая высота окна - 100px
 */
const height = window.innerHeight - 100;

/**
 * Компонент с основным контентом
 */
export const DrawerContent = ({ children, className, isOpen, lazy, onClose }: DrawerProps) => {
  const { Gesture, Spring } = useAnimationLibraries();

  const { isMounted, onCloseModal } = useModal({ animationCloseDelay: 300, isOpen, onClose });

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
    // запускаем анимацию при закрытии 'drawer'
    api.start({
      config: {
        ...Spring.config.stiff, // вид анимации: { tension: 210, friction: 20 }
        velocity: 0, // скорость ('0' по умолчанию)
      },
      onResolve: onClose, // по окончанию анимации вызываем 'onClose();'
      y: height,
    });
  };

  const bind = Gesture.useDrag(
    ({ cancel, last, direction: [, dy], movement: [, my], velocity: [, vy] }) => {
      // смещение текущего жеста < -70
      if (my < -70) {
        cancel(); // отменяем закрытие 'drawer'
      }

      // это последнее событие активного жеста
      if (last) {
        // достаточное смещение для закрытия
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close(); // закрываем 'drawer' с анимацией
        } else {
          openDrawer(); // без этого 'drawer' повторно откроется со второго клика на 'trigger'
        }
      } else {
        // это не последнее событие активного жеста
        api.start({ y: my, immediate: true }); // без анимации выставляем 'y'
      }
    },
    {
      bounds: { top: 0 }, // границы смещения жеста, может быть 'ref' или 'DOM' узлом
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

  const additionalClasses = [
    className,
    theme,
    toggleFeatures({
      name: 'isAppRedesigned',
      on: () => classes.drawerNew,
      off: () => classes.drawerOld,
    }),
  ];

  return (
    <Portal containerElement={document.getElementById('app') ?? document.body}>
      <div className={classNames(classes.Drawer, mods, additionalClasses)}>
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

/**
 * Асинхронный компонент
 */
const DrawerAsync = ({ children, ...rest }: DrawerProps) => {
  const { isLoaded } = useAnimationLibraries();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...rest}>{children}</DrawerContent>;
};

/**
 * Асинхронный компонент с анимацией
 */
export const Drawer = ({ children, ...rest }: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...rest}>{children}</DrawerAsync>
  </AnimationProvider>
);
