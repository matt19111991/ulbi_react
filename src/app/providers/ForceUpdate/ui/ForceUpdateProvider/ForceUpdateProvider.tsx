import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { ForceUpdateContext } from '@/shared/lib/context/forceUpdate';

// Костыль!

// После вызова 'forceUpdate' переключаем 'value' в 'false' и вычищаем
// всех 'children'. Далее через минимальный промежуток времени (timeout 0)
// отрисовываем 'children' обратно (переключаем 'value' в 'true').

// Таким образом DOM полностью обновится

/**
 * Провайдер для принудительного обновления
 */
export const ForceUpdateProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState(true);

  const forceUpdate = () => {
    setValue((prev) => !prev);

    setTimeout(() => {
      setValue((prev) => !prev);
    }, 0);
  };

  const valueContext = useMemo(() => ({ forceUpdate, value }), [value]);

  if (!value) {
    return null;
  }

  return <ForceUpdateContext.Provider value={valueContext}>{children}</ForceUpdateContext.Provider>;
};
