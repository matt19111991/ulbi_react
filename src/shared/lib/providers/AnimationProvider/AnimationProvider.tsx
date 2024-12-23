import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';

// для корректной типизации библиотек
import type { AnimatedComponent, WithAnimated } from '@react-spring/web'; // отдельный импорт для корректной работы с 'React v.19'
type GestureType = typeof import('@use-gesture/react'); // библиотека для свайпов, тача, "drag'n'drop"
type SpringType = typeof import('@react-spring/web'); // библиотека для анимаций
// необходимо дополнительно установить библиотеку '@react-spring/rafz'

// для корректной работы с 'React v.19'
type SpringTypeWithTypedAnimationComponent = SpringType &
  Record<'a', WithAnimated & Record<'div', AnimatedComponent<'div'>>>;

interface AnimationContextPayload {
  /**
   * Жест
   */
  Gesture?: GestureType;

  /**
   * Анимация
   */
  Spring?: SpringTypeWithTypedAnimationComponent;

  /**
   * Компонент с анимацией уже загружен?
   */
  isLoaded?: boolean;
}

/**
 * Контекст для анимаций
 */
const AnimationContext = createContext<AnimationContextPayload>({});

/**
 * Обе библиотеки зависят друг от друга и подгружаются лениво
 * Функция завершится, когда подгрузятся обе библиотеки параллельно
 */
const getAsyncAnimationModules = async () =>
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);

/**
 * Хук для работы с анимациями
 */
export const useAnimationLibraries = () => {
  // 'as', чтобы избежать ошибок "'Spring' is possibly 'undefined'" при использовании библиотек
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

/**
 * Провайдер для анимаций
 */
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // используем 'refs', чтобы был доступ к значениям без лишних перерисовок
  const GestureRef: RefObject<GestureType | undefined> = useRef(undefined); // различные варианты
  const SpringRef = useRef<SpringTypeWithTypedAnimationComponent>(undefined); // типизации 'ref'

  useEffect(() => {
    getAsyncAnimationModules()
      .then(([SpringResolved, GestureResolved]) => {
        // сохраняем результаты импортов (это сами библиотеки)
        GestureRef.current = GestureResolved;
        SpringRef.current = SpringResolved as unknown as SpringTypeWithTypedAnimationComponent;

        setIsLoaded(true);
      })
      .catch((e) => {
        console.log('Error during animation libraries loading:', e);
      });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded],
  );

  return <AnimationContext.Provider value={memoizedValue}>{children}</AnimationContext.Provider>;
};
