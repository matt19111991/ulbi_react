import { memo } from 'react';

// используется для передачи 'Generic'-типов внутрь 'JSX'-элементов ('React.memo' при такой передаче выдает ошибку)

export const genericMemo: <T>(Component: T) => T = memo;
