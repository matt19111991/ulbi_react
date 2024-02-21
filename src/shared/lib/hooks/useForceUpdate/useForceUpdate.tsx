import { useContext } from 'react';

import { ForceUpdateContext } from '../../context/forceUpdate';

/**
 * Хук для принудительного обновления
 */
export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};
