import { useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { toggleFeatures } from '@/shared/lib/features';

import { useEscapeKey } from '@/shared/lib/hooks/useEscapeKey/useEscapeKey';
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
   * Колбэк при закрытии 'Drawera'
   */
  onClose?: () => void;
}

/**
 * Компонент с основным контентом
 */
export const DrawerContent = ({ children, className, isOpen, onClose }: DrawerProps) => {
  const { Gesture, Spring } = useAnimationLibraries();

  /*
   'useSpring()' принимает на вход колбэк, который должен вернуть объект с изменяемыми параметрами,
    в нашем случае анимация будет только по 'y' ==> поэтому передаем начальную ('from') позицию для 'y':
   'y === 0' - верх экрана, а нам нужен низ: 'y' === window.innerHeight'

    хук возвращает кортеж из ['объект_с_изменяемыми_свойствами_(переданными_в_useSpring)', 'api_объект_для_анимаций']
  */
  const [{ y }, api] = Spring.useSpring(() => ({ y: window.innerHeight }));

  const { theme } = useTheme();

  const onOpenDrawer = useCallback(() => {
    // запускаем анимацию при открытии 'Drawer'
    api.start({ y: 0 }); // передаем конечную ('to') позицию для 'y'
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      onOpenDrawer();
    }
  }, [isOpen, onOpenDrawer]);

  const onCloseDrawer = useCallback(() => {
    // запускаем анимацию при закрытии 'Drawer'
    api.start({
      config: {
        ...Spring.config.stiff, // вид анимации ==> '{ tension: 210, friction: 20 }'
        velocity: 0, // стартовая скорость
      },
      onResolve: onClose, // по окончанию анимации вызываем 'onClose()'
      y: window.innerHeight, // конечная ('to') позиция для анимации - низ экрана
    });
  }, [api, onClose, Spring.config.stiff]);

  useEscapeKey(onCloseDrawer);

  /*
    обработка жестов перетягивания:
    на вход 'useDrag()' передаются 2 аргумента: 'handler: (dragConfig: DragConfig) => void' и 'config'
    на выходе функция, которая при вызове возвращает объект с обработчиками событий для перетягивания
  */
  const bind = Gesture.useDrag(
    (dragConfig) => {
      const {
        cancel, // отмена перетягивания
        last, // это последнее событие перетягивания?
        direction: [, dy], // '-1' - тянем вверх, '1' - тянем вниз
        movement: [, my], // смещение
        velocity: [, vy], // скорость
      } = dragConfig;

      // смещение < -70 (попытка перетягивания 'Drawer' вверх)
      if (my < -70) {
        cancel(); // отменяем перетягивание
      }

      // анимируем только состояние 'last' (пользователь перестал перетягивать)
      if (last) {
        // достаточное смещение для закрытия
        if (
          my > window.innerHeight * 0.5 || // смещение больше, чем на половину экрана или
          (vy > 0.5 && dy === 1) // скорость смещения вниз достаточно высокая
        ) {
          onCloseDrawer(); // закрываем 'Drawer' с анимацией
        } else {
          // иначе сбрасываем анимацию на первоначальное состояние открытого 'Drawer'
          onOpenDrawer();
        }
      } else {
        // пользователь еще перетягивает 'Drawer'
        api.start({ y: my, immediate: true }); // без анимации выставляем 'y'
      }
    },
    {
      // границы области перетягивания (может быть 'ref' или 'DOM' узлом)
      bounds: {
        bottom: window.innerHeight,
        top: 0,
      },

      filterTaps: true, // перетаскивания не будет, если пользователь только кликнул на компонент

      /*
        коэффициент эластичности при выходе за установленные пределы анимации (для 'true' === 0.15),
        при выходе за эти пределы анимация не будет обрезаться
      */
      rubberband: true,
    },
  );

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
      <div className={classNames(classes.Drawer, {}, additionalClasses)}>
        <Overlay onClick={onCloseDrawer} />

        <Spring.a.div // анимированный 'div' ('animated as a')
          className={classes.sheet}
          style={{
            y, // без этого параметра анимация не работает
          }}
          /*
           'bind()' при вызове возвращает объект с обработчиками событий,
            распыляем эти обработчики ('onPointerDown', 'onPointerMove' и т.д.)
            в анимируемый компонент, иначе не будет работать перетягивание
          */
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
};

/**
 * Компонент с асинхронно загруженными библиотеками для анимации
 */
const DrawerAsync = ({ children, ...props }: DrawerProps) => {
  const { isLoaded } = useAnimationLibraries();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props}>{children}</DrawerContent>;
};

/**
 * Финальный компонент, обернутый в провайдер с подгрузкой анимации
 */
export const Drawer = ({ children, ...props }: DrawerProps) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <AnimationProvider>
      <DrawerAsync {...props}>{children}</DrawerAsync>
    </AnimationProvider>
  );
};
