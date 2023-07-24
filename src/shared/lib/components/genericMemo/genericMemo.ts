import { memo } from 'react';

export const genericMemo: <T>(Component: T) => T = memo;
