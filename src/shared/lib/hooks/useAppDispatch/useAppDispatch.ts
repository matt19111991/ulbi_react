import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/app/providers/StoreProvider';

/**
 * Хук для переиспользования типизированного диспатча
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
