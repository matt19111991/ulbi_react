import {
  createContext,
  ReactNode,
  useRef,
  useState,
} from 'react';

// для корректной типизации библиотек
type GestureType = typeof import('@use-gesture/react');
type SpringType = typeof import('@react-spring/web');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;

  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

/*
   Обе библиотеки зависят друг от друга и подгружаются лениво
   Функция завершится, когда подгрузятся обе библиотеки
*/
const getAsyncAnimationModules = () => {
  import('@react-spring/web');
  import('@use-gesture/react');
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // используем 'refs', чтобы был доступ к значениям без лишних перерисовок
  const Gesture = useRef<GestureType>();
  const Spring = useRef<SpringType>();

  return (
    <AnimationContext.Provider value={}>
      {children}
    </AnimationContext.Provider>
  );
};
