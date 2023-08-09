import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// для корректной типизации библиотек
type GestureType = typeof import('@use-gesture/react'); // библиотека для свайпов, тача, drag'n'drop
type SpringType = typeof import('@react-spring/web'); // библиотека для анимаций

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;

  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

/*
   Обе библиотеки зависят друг от друга и подгружаются лениво
   Функция завершится, когда подгрузятся обе библиотеки параллельно
*/
const getAsyncAnimationModules = async () => Promise.all([
  import('@react-spring/web'),
  import('@use-gesture/react'),
]);

export const useAnimationLibraries = () => {
  // 'as', чтобы избежать ошибок "'Spring' is possibly 'undefined'" при использовании библиотек
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // используем 'refs', чтобы был доступ к значениям без лишних перерисовок
  const GestureRef = useRef<GestureType>();
  const SpringRef = useRef<SpringType>();

  useEffect(() => {
    getAsyncAnimationModules().then(([SpringResolved, GestureResolved]) => {
      // сохраняем результаты импортов (это сами библиотеки)
      GestureRef.current = GestureResolved;
      SpringRef.current = SpringResolved;

      setIsLoaded(true);
    });
  }, []);

  const memoizedValue = useMemo(() => ({
    Gesture: GestureRef.current,
    Spring: SpringRef.current,
    isLoaded,
  }), [isLoaded]);

  return (
    <AnimationContext.Provider value={memoizedValue}>
      {children}
    </AnimationContext.Provider>
  );
};
