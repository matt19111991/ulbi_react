import { createContext } from 'react';

export interface ForceUpdateContextProps {
  /**
   * Колбэк для принудительного обновления
   */
  forceUpdate: () => void;

  /**
   * Значение-заглушка
   */
  value: boolean;
}

export const ForceUpdateContext = createContext<ForceUpdateContextProps>({
  forceUpdate: () => {},
  value: true,
});
