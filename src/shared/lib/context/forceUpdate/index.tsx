import { createContext } from 'react';

export interface ForceUpdateContextProps {
  /**
   * Колбэк для принудительного обновления
   */
  forceUpdate: () => void;
}

export const ForceUpdateContext = createContext<ForceUpdateContextProps>({
  forceUpdate: () => {},
});
