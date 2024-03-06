import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { ForceUpdateContext } from '@/shared/lib/context/forceUpdate';

/*
  Костыль!

  После вызова 'forceUpdate()' переключаем 'showChildren' в 'false' и вычищаем всех 'children'

  Далее через минимальный промежуток времени ('timeout 0') отрисовываем 'children' обратно
  (переключаем 'showChildren' в 'true')

  Таким образом 'DOM' полностью обновится
*/

export const ForceUpdateProvider = ({ children }: { children: ReactNode }) => {
  const [showChildren, setShowChildren] = useState(true);

  const forceUpdate = () => {
    setShowChildren((prev) => !prev);

    setTimeout(() => {
      setShowChildren((prev) => !prev);
    }, 0);
  };

  const valueContext = useMemo(() => ({ forceUpdate }), []);

  if (!showChildren) {
    return null;
  }

  return <ForceUpdateContext.Provider value={valueContext}>{children}</ForceUpdateContext.Provider>;
};
