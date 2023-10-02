import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/providers/StoreProvider';

/**
 * Хук для переиспользования типизированного диспатча
 */

export const useAppDispatch = () => useDispatch<AppDispatch>();
